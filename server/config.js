module.exports = {
	PRODUCTION: process.env.NODE_ENV === 'production',
	PORT: process.env.PORT || 3000,
	MONGOLAB_URI:
		process.env.NODE_ENV === 'production'
			? process.env.MONGOLAB_URI
			: 'mongodb://localhost/nodus',
	SESSION_SECRET: process.env.COOKIES_SECRET || 'cats-the-sweetest-thing',
	WCA_OAUTH_CLIENT_ID:
		process.env.WCA_OAUTH_CLIENT_ID || 'example-application-id',
	WCA_OAUTH_SECRET: process.env.WCA_OAUTH_SECRET || 'example-secret',
	WCA_ORIGIN:
		process.env.WCA_ORIGIN || 'https://staging.worldcubeassociation.org',
	WCA_OAUTH_REDIRECT_URI:
		process.env.WCA_OAUTH_REDIRECT_URI || '/auth/wca/callback',
	COOKIE_SECRET: process.env.COOKIE_SECRET || 'keyboard cat',
	CLIENT_ORIGIN:
		process.env.NODE_ENV === 'production'
			? 'https://nouds.netlify.app/'
			: 'http://localhost:3001',
}
