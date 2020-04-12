var mongoose = require('mongoose')
var { RegistrationModel } = require('./Registration')

var Person = mongoose.Schema({
    role: Role, // Permissions: Sending messages, creating new roles, adding results, editing results, viewing results, adding competitors, remoivng competiors, editing schedule, editing general settings, assigning roles,
    name: String,
    email: String,
    registration: [RegistrationModel],
})

exports.PersonModel = mongoose.model('Person', Person)
exports.PersonSchema = Person
