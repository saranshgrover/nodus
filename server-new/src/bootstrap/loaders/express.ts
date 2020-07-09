import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'

import { config } from '../../config'
import passportConfig from './passport'
import sessionConfig from './session'

export default async (app: express.Application) => {
	// Body parser only needed during POST on the graphQL path
	app.use(config.graphqlPath, bodyParser.json())

	// Cors configuration
	app.use(cors({ credentials: true }))

	// Sets various HTTP headers to help protect our app
	app.use(helmet())

	sessionConfig(app)

	passportConfig(app)
}
