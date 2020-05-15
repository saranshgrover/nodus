const WCAStratergy = require('passport-wca')
const express = require('express')
var axios = require('axios')
const {
	WCA_ORIGIN,
	WCA_OAUTH_CLIENT_ID,
	WCA_CALLBACK_URL,
	WCA_OAUTH_SECRET,
} = require('../wca-env')
const { UserModel } = require('../models/user/User')
const { WcifModel } = require('../models/wcif/Wcif')

const handleConnect = async (accessToken, refreshToken, profile, done) => {
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
					.replace(/\s/g, '')}${Math.random().toString().slice(2, 6)}`,
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
				url: `${WCA_ORIGIN}api/v0/users/${profile.id}?upcoming_competitions=true`,
				heeaders: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			})
			if (!resp) done(null, 'Unexpected error')
			const userCompetitions = resp.data.upcoming_competitions
			userCompetitions.forEach(async (competition) => {
				const wcif = await WcifModel.findOne({ id: competition.id })
				if (wcif) {
					const userCompetition = {
						competitionType: 'WCA',
						competitionId: competition.id,
						startDate: competition.start_date,
						endDate: competition.end_date,
					}
					let roles = ['competitor']
					if (
						competition.delegates.some((delegate) => delegate.id === profile.id)
					)
						roles.push('delegate')
					if (
						competition.organizers.some(
							(organizer) => organizer.id === profile.id
						)
					)
						roles.push('organizer')
					if (
						competition.trainee_delegates.some(
							(delegate) => delegate.id === profile.id
						)
					)
						roles.push('traineeDelegate')
					user.competitions.push(userCompetition)
					await user.save()
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
	console.log(user)
	done(false, user)
}

module.exports = (passport) => {
	const router = express.Router()
	passport.use(
		new WCAStratergy(
			{
				authorizationURL: `${WCA_ORIGIN}/oauth/authorize`,
				clientID: WCA_OAUTH_CLIENT_ID,
				tokenURL: `${WCA_ORIGIN}/oauth/token`,
				clientSecret: WCA_OAUTH_SECRET,
				callbackURL: WCA_CALLBACK_URL,
				userProfileURL: `${WCA_ORIGIN}/api/v0/me`,
				scope: ['email', 'dob', 'public', 'manage_competitions'],
			},
			handleConnect
		)
	)

	passport.serializeUser((user, done) => {
		console.log('serialize')
		done(null, {
			id: user._id,
			name: user.name,
			username: user.username,
			primaryAuthenticationType: user.primaryAuthenticationType,
		})
	})

	passport.deserializeUser((_id, done) => {
		console.log('deserialize')
		console.log(id)
		UserModel.findOne({ _id }, (err, user) => {
			done(err, user)
		})
	})

	router.get('/wca', passport.authenticate('wca'))
	router.get(
		'/wca/callback',
		passport.authenticate('wca', { failureRedirect: '/login' }),
		function (req, res) {
			// Successful authentication, redirect home.
			// console.log(JSON.stringify(req))
			res.redirect('http://localhost:3001')
		}
	)
	router.get('/logout', async (req, res) => {
		await req.logout()
		await req.session.destroy()
		res.redirect('http://localhost:3001')
	})
	return router
}
