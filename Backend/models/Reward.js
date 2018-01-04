const mongoose = require('mongoose'),
	session = require('express-session'),
	Schema = mongoose.Schema

var RewardSchema = new Schema({
  points: {type: Number, required: true},
	reward: {type: String, required: true}
}, {collection: 'reward'});

module.exports = mongoose.model('Reward', RewardSchema);
