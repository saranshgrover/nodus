export const PRODUCTION = process.env.NODE_ENV === 'production'
export const SERVER_URI = PRODUCTION
	? 'https://nodus-dev.herokuapp.com'
	: 'http://localhost:3000'
