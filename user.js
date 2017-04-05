var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        firstname    : {type: String, required: true},
        accounttype  : {type: String, required: true},
        lastname     : {type: String, required: true},
        email        : {type: String, required: true},
        idNumber     : {type: String, required: true},
        username     : {type: String, required: true},
        password     : {type: String, required: true},
        radio        : String
    },
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// check if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
