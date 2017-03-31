var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var studentProfileSchema = new mongoose.Schema({
  gender: String,
  major: String,
  aboutMe: String
});

module.exports = mongoose.model('studentProfile', studentProfileSchema);
