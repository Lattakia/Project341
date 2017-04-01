passport = require('passport');

var MongoClient = require('mongodb').MongoClient;




MongoClient.connect('mongodb://127.0.0.1:27017/test', function (err, db) {
        if (err) throw err;

        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/main', // redirect to the secure profile section
            failureRedirect: '/signup', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        }), function (req, res) {
            var username = req.body.username;
            var collection = db.collection('usernames_tester');

        });

    });

app.get('/signup', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', {
            message: req.flash('signupMessage')
        });
    });
