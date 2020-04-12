var mongoose = require('mongoose')

var Activity = new mongoose.Schema()
Activity.add({
    id: Number,
    name: String,
    activityCode: String,
    startTime: Date,
    endTime: Date,
    groups: [Activity],
})
exports.ActivityModel = mongoose.model('Activity', Activity)
exports.ActivitySchema = Activity
