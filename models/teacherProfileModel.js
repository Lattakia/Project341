var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var teacherProfileSchema = new mongoose.Schema({
  gender: String,
  aboutMe: String,
  department: String,
  officeHours: String,
  office: String
});

module.exports = mongoose.model('teacherProfile', teacherProfileSchema);
