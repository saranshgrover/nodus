import express from 'express'
import mongoose from 'mongoose'
import * as webpush from 'web-push'
import { Config } from '../config'
import loaders from './loaders'

export default async (config: Config) => {
	const app = express()
	const server = await loaders(app)
	webpush.setVapidDetails(
		'mailto:contact@saranshgrover.com',
		config.webpush.publicKey,
		config.webpush.privateKey
	)
	webpush.setGCMAPIKey(config.webpush.gcmApiKey)
	server.applyMiddleware({
		cors: { origin: config.clientOrigin, credentials: true },
		app,
		path: config.graphqlPath,
		// Health check on /.well-known/apollo/server-health
		onHealthCheck: async () => {
			if (mongoose.connection.readyState === 1) return

			throw new Error()
		},
	})

	app.listen({ port: config.port }, () =>
		console.log(
			`🚀 Server ready at http://localhost:${config.port}${config.graphqlPath}`
		)
	)
}
