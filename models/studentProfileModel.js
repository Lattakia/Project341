var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var studentProfileSchema = new mongoose.Schema({
  username:String,
  picturePath:{ type: String, default: 'profile-icon-300x300.png' },
  gender: { type: String, enum: ['Male', 'Female'] },
  major: String,
  aboutMe: String
});

module.exports = mongoose.model('studentProfile', studentProfileSchema);
