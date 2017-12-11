const mongoose = require('mongoose'),
	session = require('express-session'),
	Schema = mongoose.Schema

var PointSchema = new Schema({
  firstname: {type: String, required: true},
	lastname: {type: String, required: true},
  points: {type: Number, required: true}
}, {collection: 'points'});

module.exports = mongoose.model('Point', PointSchema);
