import { DocumentType } from '@typegoose/typegoose'
import bcrypt from 'bcryptjs'
import express from 'express'
import { Error } from 'mongoose'
import { IVerifyOptions } from 'passport-local'
import { config } from '../../config'
import { Competition, User } from '../../entities'
import { UserMongooseModel } from '../../modules/user/model'
import wcaApiFetch from '../../modules/user/utils/wcaApiFetch'
import { WcifMongooseModel } from '../../modules/wcif/model'
import createUsername from './createUsername'

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

interface AuthorizeWCACallback extends PassportWCACallback {
	req: Context['req']
}

type PassportCallback = PassportWCACallback | PassportLocalCallback

type AuthorizeCallback = AuthorizeWCACallback

export function handleConnect(
	type: string,
	passportCallback: PassportCallback
) {
	switch (type) {
		case 'WCA':
			return handleWCAConnect(passportCallback as PassportWCACallback)
		case 'LOCAL':
			return handleLocalConnect(passportCallback as PassportLocalCallback)
	}
}

export function handleAuthorize(
	type: string,
	authroizeCallback: AuthorizeCallback
) {
	switch (type) {
		case 'WCA':
			return handleWCAAuthroize(authroizeCallback as AuthorizeWCACallback)
	}
}

const SALT_AMOUNT = 8 // Salt for bcrypt

export async function handleWCAAuthroize({
	req,
	accessToken,
	refreshToken,
	profile,
	done,
}: AuthorizeWCACallback) {
	const user = await UserMongooseModel.findById(req.user.id)
	if (!user) return done(new Error('No such user found'), null)
	const wcaConnection = newWCAConnection({ accessToken, refreshToken, profile })
	user.connections.push(wcaConnection)
	try {
		await fetchAndUpdateUpcomingCompetitions(user, accessToken, profile.id)
	} catch (err) {
		return done(err, null)
	}
	done(false, user)
}

export async function handleWCAConnect({
	accessToken,
	refreshToken,
	profile,
	done,
}: PassportWCACallback) {
	const UserModel = UserMongooseModel
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
				username: createUsername(profile.displayName),
				name: profile.displayName,
				email: profile.emails[0].value,
				primaryAuthenticationType: 'WCA',
				connections: [
					{ ...newWCAConnection({ accessToken, refreshToken, profile }) },
				],
			})
			await fetchAndUpdateUpcomingCompetitions(user, accessToken, profile.id)
		} else
			await UserModel.findOneAndUpdate(
				{ _id: user._id },
				{ $set: { [`connections.$[outer].accessToken`]: accessToken } },
				{ arrayFilters: [{ 'outer.connectionType': 'WCA' }] }
			)
	} catch (err) {
		done(err, null)
	}
	done(false, user)
}

export async function handleLocalConnect({
	req,
	username,
	password,
	done,
}: PassportLocalCallback) {
	const UserModel = UserMongooseModel
	if (req.headers.referer && req.headers.referer.indexOf('signin') > 0) {
		// User is signing in
		let user
		try {
			user = await UserModel.findOne({ email: username })
			console.log(user)
		} catch (err) {
			done(err, null)
		}
		if (!user) return done(null, false)
		// Check password
		if (bcrypt.compareSync(password, user.password)) return done(null, user)
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

function newWCAConnection({
	accessToken,
	refreshToken,
	profile,
}: Omit<PassportWCACallback, 'done'>) {
	return {
		connectionType: 'WCA',
		accessToken: accessToken,
		refreshToken: refreshToken,
		content: {
			id: profile.id,
			delegateStatus: profile.wca.delegate_status,
			birthdate: profile.wca.dob,
			wcaId: profile.wca.id,
			photos: [
				...profile.photos.map((photo: { value: String }) => photo.value),
			],
			teams: [
				...profile.wca.teams.map(
					(team: { friendly_id: String; leader: Boolean }) => ({
						friendlyId: team.friendly_id,
						leader: team.leader,
					})
				),
			],
		},
	}
}

async function fetchAndUpdateUpcomingCompetitions(
	user: DocumentType<User>,
	accessToken: string,
	wcaUserId: string
) {
	const resp = await wcaApiFetch<any>(
		{
			method: 'GET',
			url: `${config.wca.originURL}/api/v0/users/${wcaUserId}?upcoming_competitions=true`,
			headers: {
				'Content-Type': 'application/json',
			},
		},
		{ accessToken }
	)
	if (!resp) throw new Error('Unable to fetch upcoming competitions from WCA')
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
				notifications: [],
			}
			if (
				competition.delegates.some((delegate: any) => delegate.id === wcaUserId)
			)
				userCompetition.roles.push('delegate')
			if (
				competition.organizers.some(
					(organizer: any) => organizer.id === wcaUserId
				)
			)
				userCompetition.roles.push('organizer')
			if (
				competition.trainee_delegates.some(
					(delegate: any) => delegate.id === wcaUserId
				)
			)
				userCompetition.roles.push('traineeDelegate')
			user!.competitions.push(userCompetition)
		}
	})
	await user.save()
	return
}
