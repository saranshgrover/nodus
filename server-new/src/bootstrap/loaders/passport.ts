import passport from 'passport'
import express from 'express'
import auth from '../../utils/auth'

export default async (app: express.Application) => {
	app.use(passport.initialize())
	app.use(passport.session())
	app.use('/auth', auth(passport))
}
