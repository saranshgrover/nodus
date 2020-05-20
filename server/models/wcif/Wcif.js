var mongoose = require('mongoose')

var Avatar = new mongoose.Schema({
	url: String,
	thumbUrl: String,
})
exports.AvatarModel = mongoose.model('Avatar', Avatar)
var PersonalBests = new mongoose.Schema({
	eventId: String,
	best: Number,
	worldRanking: Number,
	continentalRanking: Number,
	nationalRanking: Number,
	type: String,
})
exports.PersonalBestsModel = mongoose.model('PersonalBests', PersonalBests)
var AdvancementCondition = new mongoose.Schema({
	type: String,
	level: [Number],
})
exports.AdvancementConditionModel = mongoose.model(
	'AdvancementCondition',
	AdvancementCondition
)
var Extension = new mongoose.Schema({
	id: String,
	specUrl: String,
	data: Object,
})
exports.ExtensionModel = mongoose.model('Extension', Extension)
var Assignment = new mongoose.Schema({
	activityId: Number,
	assignmentCode: String,
	stationNumber: Number,
})
exports.AssingmentModel = mongoose.model('Assignment', Assignment)
var Registration = new mongoose.Schema({
	wcaRegistrationId: Number,
	eventIds: [String],
	status: String,
	guests: Number,
	comments: String,
})
exports.RegistrationModel = mongoose.model('Registration', Registration)
var ChildActivity = new mongoose.Schema({
	id: Number,
	name: String,
	activityCode: String,
	startTime: String,
	endTime: String,
	scrambleSetId: Number,
	extensions: [Extension],
})
exports.ChildActivity = mongoose.model('ChildActivity', ChildActivity)
var Activity = new mongoose.Schema() // Activity is defined somewhat differently due to its recursive nature
Activity.add({
	id: Number,
	name: String,
	activityCode: String,
	startTime: String,
	endTime: String,
	childActivities: [Activity], // Recursive
	scrambleSetId: Number,
	extensions: [Extension],
})
exports.ActivityModel = mongoose.model('Activity', Activity)
var Room = new mongoose.Schema({
	id: Number,
	name: String,
	color: String,
	activities: [Activity],
	extensions: [Extension],
})
exports.RoomModel = mongoose.model('Room', Room)
var Venue = new mongoose.Schema({
	id: Number,
	name: String,
	latitudeMicrodegrees: Number,
	longitudeMicrodegrees: Number,
	countryIso2: String,
	timezone: String,
	rooms: [Room],
	extensions: [Extension],
})
exports.VenueModel = mongoose.model('Venue', Venue)
var Schedule = new mongoose.Schema({
	startDate: String,
	numberOfDays: Number,
	venues: [Venue],
})
exports.ScheduleModel = mongoose.model('Schedule', Schedule)
var Attempt = new mongoose.Schema({
	result: Number,
	reconstruction: String,
})
exports.AttemptModel = mongoose.model('Attempt', Attempt)
var Result = new mongoose.Schema({
	personId: String,
	ranking: Number,
	attempts: [Attempt],
	best: Number,
	average: Number,
})
exports.ResultModel = mongoose.model('Result', Result)
var ScrambleSet = new mongoose.Schema({
	id: String,
	scrambles: [String],
	extraScrambles: [String],
})
exports.ScrambleSetModel = mongoose.model('ScrambleSet', ScrambleSet)
var TimeLimit = new mongoose.Schema({
	centiseconds: Number,
	cumulativeRoundIds: [String],
})
exports.TimeLimitModel = mongoose.model('TimeLimit', TimeLimit)
var Cutoff = new mongoose.Schema({
	numberOfAttempts: Number,
	attemptResult: [Number],
})
exports.CutoffModel = mongoose.model('Cutoff', Cutoff)
var Qualification = new mongoose.Schema({
	when: String,
	type: String,
	attemptResult: Number,
})
exports.QualificationModel = mongoose.model('Qualification', Qualification)
var Person = new mongoose.Schema({
	name: String,
	wcaUserId: Number,
	wcaId: String,
	registrantId: Number,
	countryIso2: String,
	gender: String,
	birthdate: String,
	email: String,
	registration: Registration,
	avatar: Avatar,
	roles: [String],
	assignments: [Assignment],
	personalBests: [PersonalBests],
})
exports.PersonModel = mongoose.model('Person', Person)
var Round = new mongoose.Schema({
	id: String,
	format: String,
	timeLimit: TimeLimit,
	cutoff: Cutoff,
	advancementCondition: AdvancementCondition,
	scrambleSetCount: Number,
	scrambleSets: [ScrambleSet],
	results: [Result],
	extensions: [Extension],
})
exports.RoundModel = mongoose.model('Round', Round)
var Event = new mongoose.Schema({
	id: String,
	rounds: [Round],
	extensions: [Extension],
	competitorLimit: Number,
	qualification: Qualification,
})
exports.EventModel = mongoose.model('Event', Event)
var Wcif = new mongoose.Schema({
	formatVersion: String,
	id: String,
	name: String,
	shortName: String,
	persons: [Person],
	events: [Event],
	schedule: Schedule,
	competitorLimit: Number,
	extensions: [Extension],
	locationName: String,
	registrationOpen: String,
	registrationClose: String,
})
const WcifModel = mongoose.model('Wcif', Wcif)
exports.WcifModel = WcifModel
