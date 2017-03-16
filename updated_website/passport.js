// load passport-local as a strategy
var LocalStrategy   = require('passport-local').Strategy;

// load the user model
var User = require('./user.js');

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
    
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) {

        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        process.nextTick(function() {

     
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // verify if there is already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

                // if there is no user with that email
                // create the user
                var newUser            = new User();

                // set the user's local credentials
                newUser.local.firstname = firstname;
                newUser.local.lastname = lastname;
                newUser.local.email    = email;
                newUser.local.password = newUser.generateHash(password);

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });    

        });

    }));
  

};



