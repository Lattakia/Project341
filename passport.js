// load passport-local as a strategy
var LocalStrategy   = require('passport-local').Strategy;

// load the user model
var User = require('./user');

// expose this function to our app using module.exports
module.exports = function(passport) {
    
    // passport session setup

    // function to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // function to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    
    // Local login auth

    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) { 

        User.findOne({ 'local.email' :  email }, function(err, user) {
            
            if (err)
                return done(err);

            // when no user is found
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.'));

            // if user is found but password is incorrect
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

            return done(null, user);
        });

    }));

};
