var mongoose = require('mongoose')
var { RoomModel } = require('./Room')

var Venue = new mongoose.Schema({
    name: String,
    latitudeMicrodegrees: Number,
    longitudeMicrodegrees: Number,
    countryIso2: String,
    timezone: String,
    rooms: [Room],
})
exports.VenueSchema = Venue
exports.VenueModel = mongoose.model('Venue', Venue)
