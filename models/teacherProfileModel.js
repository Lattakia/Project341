var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var teacherProfileSchema = new mongoose.Schema({
  username:String,
  picturePath:{ type: String, default: 'profile-icon-300x300.png' },
  gender: { type: String, enum: ['Male', 'Female'] },
  aboutMe: String,
  department: String,
  officeHours: String,
  office: String
});

module.exports = mongoose.model('teacherProfile', teacherProfileSchema);
