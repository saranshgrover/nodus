var mongoose = require('mongoose')

var Registration = mongoose.Schema({
    eventIds: [String],
    status: String,
    guests: Number,
})

exports.RegistrationModel = mongoose.model('Registration', Registration)
exports.RegistrationSchema = Registration
