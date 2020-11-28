import connectMongo from 'connect-mongo'
import express from 'express'
import session from 'express-session'
import mongoose from 'mongoose'
import { config } from '../../config'

export default async (app: express.Application) => {
	app.set('trust proxy', 1)
	const MongoStore = connectMongo(session)

	const sessionOptions = {
		secret: config.cookieSecret,
		saveUninitialized: false, // don't create session until something stored
		resave: false, // don't save session if unmodified,
		proxy: true,
		cookie: {
			httpOnly: true,
			secure: true,
			// Note: This may be temporary. sameSite should be true but requires work to set up server and client on same URL.
			sameSite: 'none',
		},
		store: new MongoStore({
			mongooseConnection: mongoose.connection,
		}),
	}
	const expressSession = session(sessionOptions)
	app.use(expressSession)
}
