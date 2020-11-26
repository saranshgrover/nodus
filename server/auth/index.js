const WCAStratergy = require('passport-wca')
const LocalStrategy = require('passport-local')
const express = require('express')
var axios = require('axios')
const {
	WCA_ORIGIN,
	WCA_OAUTH_CLIENT_ID,
	WCA_OAUTH_REDIRECT_URI,
	WCA_OAUTH_SECRET,
	CLIENT_ORIGIN,
} = require('../config')
const { UserModel } = require('../models/user/User')
const { WcifModel } = require('../models/wcif/Wcif')
var bcrypt = require('bcryptjs')

const SALT_AMOUNT = 8 // Salt for bcrypt

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
				url: `${WCA_ORIGIN}/api/v0/users/${profile.id}?upcoming_competitions=true`,
				headers: {
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
				callbackURL: WCA_OAUTH_REDIRECT_URI,
				userProfileURL: `${WCA_ORIGIN}/api/v0/me`,
				scope: ['email', 'dob', 'public', 'manage_competitions'],
			},
			handleConnect
		)
	)

	passport.use(
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
				passReqToCallback: true,
				session: true,
			},
			async function (req, username, password, done) {
				if (req.headers.referer.indexOf('signin') > 0) {
					// User is signing in
					let user
					try {
						user = await UserModel.findOne({ email: username })
					} catch (err) {
						done(err, null)
					}
					if (!user) return done(null, false)
					// Check password
					if (bcrypt.compareSync(password, user.password))
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
			res.redirect(CLIENT_ORIGIN)
		}
	)
	router.post('/local', passport.authenticate('local'), function (req, res) {
		res.json({ redirect: CLIENT_ORIGIN })
	})
	router.get('/logout', async (req, res) => {
		await req.logout()
		await req.session.destroy()
		res.redirect(CLIENT_ORIGIN)
	})
	return router
}
