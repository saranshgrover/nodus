var mongoose = require('mongoose')

var Person = new mongoose.Schema({
	registrationId: Number,
	name: String,
	wcaUserId: Number,
	wcaId: String,
	countryIso2: String,
	gender: String,
	birthdate: Date,
	email: String,
	avatar: Avatar
})

var Wcif = new mongoose.Schema({
	formatVersion: String,
	id: String,
	name: String,
	shortName: String,
	persons: [Persons],
	events: [Event],
	schedule: Schedule,
	competitorLimit: Number,
	extensions: [Extension]
})
var Persons = new mongoose.Schema({
	name: String,
	wcaUserId: Number,
	wcaId: String,
	registrantId: Number,
	countryIso2: String,
	gender: String,
	birthdate: Date,
	emai: String,
	registration: [Registration],
	avatar: Avatar,
	roles: [String],
	assignments: [Assingment],
	personalBests: [PersonalBests]
})
var Assignment = new mongoose.Schema({
	activityId: Number,
	assignmentCode: String,
	stationNumber: Number
})
var Registration = new mongoose.Schema({
	wcaRegistrationId: Number,
	eventIds: [String],
	status: String,
	guests: Number,
	comments: String
})
var Avatar = new mongoose.Schema({
	url: String,
	thumbUrl: String
})
var PersonalBests = new mongoose.Schema({
	eventId: String,
	best: Number,
	worldRanking: Number,
	continentalRanking: Number,
	nationalRanking: Number,
	type: String
})
var Event = new mongoose.Schema({
	id: String,
	rounds: [Round],
	extensions: [Extension],
	competitorLimit: Number,
	qualification: Qualification
})
var Round = new mongoose.Schema({
	id: String,
	format: String,
	timeLimit: TimeLimit,
	cutoff: Cutoff,
	advancementCondition: AdvancementCondition,
	scrambleSetCount: Number,
	scrambleSets: [ScrambleSet],
	results: [Result],
	extensions: [Extension]
})
var ScrambleSet = new mongoose.Schema({
	id: String,
	scrambles: [String],
	extraScrambles: [String]
})

var TimeLimit = new mongoose.Schema({
	centiseconds: Number,
	cumulativeRoundIds: [String]
})
var Cutoff = new mongoose.Schema({
	numberOfAttempts: Number,
	attemptResult: [AttemptResult]
})
var AdvancementCondition = new mongoose.Schema({
	type: String,
	level: [Number]
})
var Qualification = new mongoose.Schema({
	when: Date,
	type: String,
	attemptResult: AttemptResult
})
var Result = new mongoose.Schema({
	personId: String,
	ranking: Number,
	attempts: [Attempt],
	best: AttemptResult,
	average: AttemptResult
})
var Attempt = new mongoose.Schema({
	result: AttemptResult,
	reconstruction: String
})
var Schedule = new mongoose.Schema({
	startDate: Date,
	numberOfDays: Number,
	venues: [Venue]
})
var Venue = new mongoose.Schema({
	id: Number,
	name: String,
	latitudeMicrodegrees: Number,
	longitudeMicrodegrees: Number,
	countryIso2: String,
	timezone: String,
	rooms: [Room],
	extensions: [Extension]
})
var Room = new mongoose.Schema({
	id: Number,
	name: String,
	color: String,
	activities: [Activity],
	extensions: [Extension]
})
var Activity = new mongoose.Schema({
	id: Number,
	name: String,
	activityCode: String,
	startTime: Date,
	endTime: Date,
	childActivities: [Activity],
	scrambleSetId: Number,
	extensions: [Extension]
})

var Extension = new mongoose.Schema({
	id: String,
	specUrl: String,
	data: Object
})

module.exports = mongoose.model('Wcif', Wcif)
