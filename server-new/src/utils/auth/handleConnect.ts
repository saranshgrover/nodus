import express from 'express'
import { IVerifyOptions } from 'passport-local'
import { UserMongooseModel } from '../../modules/user/model'
import axios from 'axios'
import bcrypt from 'bcryptjs'

import { config } from '../../config'
import { WcifMongooseModel } from '../../modules/wcif/model'
import { Competition } from '../../entities'

interface PassportWCACallback {
	accessToken: string
	refreshToken: string
	profile: any
	done: (err: any, user: any) => void
}

interface PassportLocalCallback {
	req: express.Request
	username: string
	password: string
	done: (error: any, user?: any, options?: IVerifyOptions) => void
}

type PassportCallback = PassportWCACallback | PassportLocalCallback

export default function (type: string, passportCallback: PassportCallback) {
	switch (type) {
		case 'WCA':
			return handleWCAConnect(passportCallback as PassportWCACallback)
		case 'LOCAL':
			return handleLocalConnect(passportCallback as PassportLocalCallback)
	}
}

const SALT_AMOUNT = 8 // Salt for bcrypt

export async function handleWCAConnect({
	accessToken,
	refreshToken,
	profile,
	done,
}: PassportWCACallback) {
	const UserModel = UserMongooseModel
	const users = await UserModel.find()
	// console.log(users[0].connections[0])
	let user = await UserModel.findOne({
		connections: {
			$elemMatch: {
				$and: [{ connectionType: 'WCA' }, { 'content.id': profile.id }],
			},
		},
	})
	try {
		if (!user) {
			user = new UserModel({
				// TODO Make this a function
				username: `${profile.displayName
					.toLowerCase()
					.replace(/\s/g, '')}${Math.random()
					.toString()
					.slice(2, 6)}`,
				name: profile.displayName,
				email: profile.emails[0].value,
				primaryAuthenticationType: 'WCA',
				connections: [
					{
						connectionType: 'WCA',
						accessToken: accessToken,
						// TODO1: Parse user profile
						content: profile,
					},
				],
			})
			const resp = await axios({
				method: 'GET',
				url: `${config.wca.originURL}/api/v0/users/${profile.id}?upcoming_competitions=true`,
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			})
			if (!resp) done(null, 'Unexpected error')
			const userCompetitions = resp.data.upcoming_competitions
			userCompetitions.forEach(async (competition: any) => {
				const wcif = await WcifMongooseModel.findOne({
					id: competition.id,
				})
				if (wcif) {
					const userCompetition: Competition = {
						competitionType: 'WCA',
						competitionId: competition.id,
						startDate: competition.start_date,
						endDate: competition.end_date,
						roles: ['competitor'],
					}
					if (
						competition.delegates.some(
							(delegate: any) => delegate.id === profile.id
						)
					)
						userCompetition.roles.push('delegate')
					if (
						competition.organizers.some(
							(organizer: any) => organizer.id === profile.id
						)
					)
						userCompetition.roles.push('organizer')
					if (
						competition.trainee_delegates.some(
							(delegate: any) => delegate.id === profile.id
						)
					)
						userCompetition.roles.push('traineeDelegate')
					user!.competitions.push(userCompetition)
					await user!.save()
				}
			})
			await user.save()
		} else
			await UserModel.findOneAndUpdate(
				{ _id: user._id },
				{ $set: { [`connections.$[outer].accessToken`]: accessToken } },
				{ arrayFilters: [{ 'outer.connectionType': 'WCA' }] }
			)
	} catch (err) {
		done(err, null)
	}
	// console.log(user)
	done(false, user)
}

export async function handleLocalConnect({
	req,
	username,
	password,
	done,
}: PassportLocalCallback) {
	const UserModel = UserMongooseModel
	if (req.headers.referrer && req.headers.referrer.indexOf('signin') > 0) {
		// User is signing in
		let user
		try {
			user = await UserModel.findOne({ email: username })
		} catch (err) {
			done(err, null)
		}
		if (!user) return done(null, false)
		// Check password
		if (bcrypt.compareSync(password, user.hashedPassword))
			return done(null, user)
		// Password is wrong
		return done(null, false)
	} else {
		// User is register for an account
		let body = req.body
		// Body should contain name, username, email, and password
		if (!(body.name && body.username && body.email && body.password))
			return done(null, false)
		// Make sure username and email aren't already used
		const checkUser = await UserModel.findOne({
			$or: [{ email: body.email }, { username: body.username }],
		}).exec()
		if (checkUser) {
			// User exists
			console.log('User already exists. Err')
			return done(null, false)
		} else {
			// User is valid, hash password
			var hash = bcrypt.hashSync(body.password, SALT_AMOUNT)
			// Create user
			let newUser = new UserModel({
				email: body.email,
				username: body.username,
				password: hash,
				name: body.name,
				primaryAuthenticationType: 'local',
			})
			// Save user to DB
			await newUser.save()
			return done(null, newUser)
		}
	}
}
