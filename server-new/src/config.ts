import dotenv from 'dotenv'
dotenv.config()

export const PRODUCTION = process.env.NODE_ENV === 'production'
// Safely get the environment variable in the process
const env = (name: string): string => {
	const value = process.env[name]

	if (!value) {
		throw new Error(`Missing: process.env['${name}'].`)
	}

	return value
}

export interface Config {
	wca: {
		authorizationURL: string
		clientID: string
		originURL: string
		clientSecret: string
		callbackURL: string
		scope: string[]
	}
	clientOrigin: string
	cookieSecret: string
	port: number
	graphqlPath: string
	isDev: boolean
	mongoDB: {
		uri: string
	}
	redis: {
		host: string
		port: number
	}
}

// All your secrets, keys go here
export const config: Config = {
	clientOrigin: env('CLIENT_ORIGIN'),
	cookieSecret: env('COOKIE_SECRET'),
	port: +env('PORT'),
	graphqlPath: env('GRAPHQL_PATH'),
	isDev: env('NODE_ENV') === 'development',
	mongoDB: {
		uri: env('MONGODB_URI'),
	},
	redis: {
		port: +env('REDIS_PORT'),
		host: env('REDIS_HOST'),
	},
	wca: {
		originURL: PRODUCTION
			? env('WCA_ORIGIN')
			: 'https://staging.worldcubeassociation.org',
		authorizationURL: `${
			PRODUCTION
				? env('WCA_ORIGIN')
				: 'https://://staging.worldcubeassociation.org'
		}/oauth/authorize`,
		clientID: PRODUCTION
			? env('WCA_OAUTH_CLIENT_ID')
			: 'example-application-id',
		callbackURL: PRODUCTION
			? env('WCA_OAUTH_REDIRECT_URL')
			: '/auth/wca/callback',
		clientSecret: PRODUCTION ? env('WCA_OAUTH_SECRET') : 'example-secret',
		scope: ['email', 'dob', 'public', 'manage_competitions'],
	},
}
