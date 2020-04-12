var mongoose = require('mongoose')
var { ActivityModel } = require('./Activity')

var Room = new mongoose.Schema({
    id: Number,
    name: String,
    activities: [Activity],
})

exports.RoomModel = mongoose.model('Room', Room)
exports.RoomSchema = Room
