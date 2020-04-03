var mongoose = require('mongoose')

var LogoSchema = new mongoose.Schema({
	id: String,
	text: String,
	color: String,
	fontSize: { type: Number, min: 2, max: 144 },
	lastUpdate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Logo', LogoSchema)
