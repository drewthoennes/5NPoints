const mongoose = require('mongoose'),
	session = require('express-session'),
	Schema = mongoose.Schema

var UserSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
}, {collection: 'users'});

UserSchema.methods.comparePassword = function(password, callback) {
  if(this.password === password) {
    return callback(true);
  }
  else {
    return callback(false);
  }
}

module.exports = mongoose.model('User', UserSchema);
