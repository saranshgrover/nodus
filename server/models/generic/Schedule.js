var mongoose = require('mongoose')
var { VenueModel } = require('./Venue')

var Schedule = new mongoose.Schema({
    startDate: Date,
    endDate: Date,
    numberOfDays: Number,
    venues: [Venue],
})
exports.ScheduleSchema = Schedule
exports.ScheduleModel = mongoose.model('Schedule', Schedule)
