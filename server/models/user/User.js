var mongoose = require('mongoose')

const ExternalConnection = new mongoose.Schema({
	connectionType: String,
	accessToken: String,
	content: {},
})
/**
 * Roles:
 * 	organizer
 * 	competitor
 * 	delegate
 * trainee_delegate
 *
 */
const User = new mongoose.Schema({
	// TODOp1
	username: String,
	email: { type: String, required: true },
	// Prioritize LOCAL always. i.e if user sets a password in the future, primaryAuthType will be LOCAL.
	primaryAuthenticationType: String,
	name: String,
	hashedPassword: {
		type: String,
		required: () => this.primaryAuthenticationType === 'LOCAL',
	},
	competitions: [
		{
			competitionId: String,
			competitionType: String,
			roles: [String],
			startDate: String,
			endDate: String,
		},
	],
	connections: {
		type: [ExternalConnection],
		required: () =>
			this.primaryAuthenticationType &&
			this.primaryAuthenticationType !== 'LOCAL',
	},
})
exports.UserModel = mongoose.model('User', User)
