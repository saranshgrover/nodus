var mongoose = require('mongoose')
var { PersonSchema } = require('./Person')
var { ScheduleSchema } = require('./Schedule')
var { EventSchema } = require('./Event')
var { SettingSchema } = require('./Setting')

var Competition = mongoose.Schema({
    name: String,
    id: String, // Note: This won't be user generated, rather we'll use the name to generate an ID similar to the name
    Persons: [Person],
    schedule: Schedule,
    events: [Event],
    settings: Setting,
})
exports.CompetitionSchema = Competition
exports.CompetitionModel = mongoose.model('Competition', Competition)
