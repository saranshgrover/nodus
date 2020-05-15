export const PRODUCTION = process.env.NODE_ENV === 'production'

export const WCA_ORIGIN = PRODUCTION
	? 'https://www.worldcubeassociation.org'
	: 'https://staging.worldcubeassociation.org'

export const WCA_OAUTH_CLIENT_ID = PRODUCTION
	? 'NknZHB8kACnmpBV24fKKcwV8PRGijwjjtaT8iTx4yNg'
	: 'example-application-id'
