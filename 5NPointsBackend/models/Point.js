const mongoose = require('mongoose'),
	session = require('express-session'),
	Schema = mongoose.Schema

var PointSchema = new Schema({
  name: {type: String, required: true, unique: true},
  points: {type: Number, required: true}
}, {collection: 'points'});

module.exports = mongoose.model('Point', PointSchema);
