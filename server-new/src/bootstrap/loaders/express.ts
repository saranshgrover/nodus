import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import passportConfig from './passport'
import sessionConfig from './session'

export default async (app: express.Application) => {
	// Body parser only needed during POST on the graphQL path
	app.use(bodyParser.json())
	// Cors configuration
	app.use('*', cors({ origin: 'http://localhost:3001', credentials: true }))

	// Sets various HTTP headers to help protect our app
	app.use(helmet())

	await sessionConfig(app)

	await passportConfig(app)
}
