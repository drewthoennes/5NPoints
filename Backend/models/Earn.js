const mongoose = require('mongoose'),
	session = require('express-session'),
	Schema = mongoose.Schema

var EarnSchema = new Schema({
	activity: {type: String, required: true},
  points: {type: Number, required: true}
}, {collection: 'earn'});

module.exports = mongoose.model('Earn', EarnSchema);
