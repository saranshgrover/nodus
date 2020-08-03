import express from 'express'
import { ObjectId } from 'mongodb'
import passport from 'passport'
import * as passportLocal from 'passport-local'
import WCAStratetgy from 'passport-wca'
import { config } from '../../config'
import { User } from '../../entities'
import { UserMongooseModel } from '../../modules/user/model'
import handleConnect from './handleConnect'
const LocalStrategy = passportLocal.Strategy

export default function (passport: passport.PassportStatic) {
	const router = express.Router()
	const {
		wca: {
			authorizationURL,
			callbackURL,
			clientID,
			clientSecret,
			originURL,
			scope,
		},
	} = config
	passport.use(
		new WCAStratetgy(
			{
				authorizationURL: authorizationURL,
				clientID: clientID,
				tokenURL: `${originURL}/oauth/token`,
				clientSecret: clientSecret,
				callbackURL: callbackURL,
				userProfileURL: `${originURL}/api/v0/me`,
				scope: scope,
			},
			(
				accessToken: string,
				refreshToken: string,
				profile: any,
				done: () => void
			) =>
				handleConnect('WCA', {
					accessToken,
					refreshToken,
					profile,
					done,
				})
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
			(req, username, password, done) =>
				handleConnect('LOCAL', { req, username, password, done })
		)
	)

	passport.serializeUser((user: User, done) => {
		done(null, {
			id: user._id,
			name: user.username,
			username: user.username,
			primaryAuthenticationType: user.primaryAuthenticationType,
			competitions: user.competitions,
		})
	})

	passport.deserializeUser((user: Partial<User> & { id: ObjectId }, done) => {
		console.log('deserialize')
		UserMongooseModel.findOne({ _id: user.id }, (err, user) => done(err, user))
	})

	router.get('/wca', passport.authenticate('wca'))
	router.get(
		'/wca/callback',
		passport.authenticate('wca', { failureRedirect: '/login' }),
		(req, res) => res.redirect(config.clientOrigin)
	)
	router.get('/logout', async (req, res) => {
		await req.logout()
		req.session?.destroy((err) => console.error(err))
		res.redirect(config.clientOrigin)
	})

	router.post('/local', passport.authenticate('local'), (req, res) => {
		res.json({ redirect: config.clientOrigin })
	})

	return router
}
