
passport = require('passport');
app = require('express')();

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var assert = require('assert');
mongoose.Promise = require('bluebird');

passport = require('passport');
app = require('express')();

var express = require('express');

var Mailgun = require('mailgun-js');

var app = express();
//Your api key, from Mailgun’s Control Panel
var api_key = 'key-e63cfbbb0bb500d1b5428053228f6360';


//Your domain, from the Mailgun Control Panel
var domain = 'connectconcordia.tk';

//Your sending email address
var from_who = 'encs@connectconcordia.tk';

var app = require('express')();

module.exports = function(app, passport) {

    var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
    if(err) throw err;

    app.post('/signup',passport.authenticate('local-signup', {
        successRedirect : '/main', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }), function(req, res) {
    var username = req.body.username;
    var collection = db.collection('usernames_tester');


});

});

var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
    if(err) throw err;

    var collection = db.collection('test_insert1');

    // Locate all the entries using find
    collection.find().toArray(function(err, results) {
        console.dir(results);
        // Let's close the db
        db.close();
    });
});


    // Home page
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });


    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
    
    
    app.get('/chat', checkAuthentication, function(req, res) {
        
        var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

MongoClient.connect('mongodb://127.0.0.1:27017/main', function(err, db) {
    if(err) throw err;

    var collection = db.collection('users');
    var person = req.session.session.title;

    // Locate all the entries using find
    collection.find().toArray(function(err, results) {
        var resa = results;
        console.log(resa);
        console.log(person);
        var saveindex = 10;
        
        for(var i=0;i<resa.length;i++)
        {
            if(person == resa[i]['local']['email'])
            {
                    saveindex = i;
            }
           
        }  
       
        //var emailofuser = resa[saveindex]['local']['email'];
        var firstname = resa[saveindex]['local']['firstname'];
        var lastname = resa[saveindex]['local']['lastname'];
        console.log(firstname);
         console.log(lastname);
       res.render('chat.ejs', {firstname:firstname,lastname:lastname}
            //user : req.user // get the user out of session and pass to template
        );
        db.close();
        });

        });
        
    console.log(req.session.session);
    // passing data from one page to the other
    app.set('data', req.session.session);

    }); function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //if user is looged in, req.isAuthenticated() will return true
        next();
    } else{
        res.redirect("/");
    }
}

     app.get('/login', function(req, res) {

        res.render('login.ejs', { message: req.flash('loginMessage')
        });
    });


     app.get('/login', function(req, res) {

        res.render('login.ejs', { message: req.flash('loginMessage')
        });
    });

	app.get('/submitted', function(req, res) {

        res.render('chat.ejs', { message: req.flash('loginMessage')});

    });

 app.get('/main', checkAuthentication, function(req, res) {

     var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

MongoClient.connect('mongodb://127.0.0.1:27017/main', function(err, db) {
    if(err) throw err;

    var collection = db.collection('users');
    var person = req.session.session.title;

    // Locate all the entries using find
    collection.find().toArray(function(err, results) {
        var resa = results;
        console.log(resa);
        console.log(person);
        var saveindex = 10;

        for(var i=0;i<resa.length;i++)
        {
            if(person == resa[i]['local']['username'])
            {
                    saveindex = i;
            }

        }

        //var emailofuser = resa[saveindex]['local']['email'];
        var firstname = resa[saveindex]['local']['firstname'];
        var lastname = resa[saveindex]['local']['lastname'];
        console.log(firstname);
         console.log(lastname);
       res.render('main.ejs', {firstname:firstname,lastname:lastname}
            //user : req.user // get the user out of session and pass to template
        );
        db.close();
        });

});




        // passing data from one page to the other
        app.set('data', req.session.session);

    });

  var session = require('express-session');
 app.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
      console.log(req.body.username);
    if (err) { return next(err); }
    // Redirect if it fails
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      // Redirect if it succeeds
        req.session.session = {
            title: req.body.username
        };
        //e

  var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

MongoClient.connect('mongodb://127.0.0.1:27017/main', function(err, db) {
    if(err) throw err;

    var collection = db.collection('users');
    var person = req.session.session.title;

    // Locate all the entries using find
    collection.find().toArray(function(err, results) {
        var resa = results;
        console.log(resa);
        console.log(person);
        var saveindex = 10;

        for(var i=0;i<resa.length;i++)
        {
            if(person == resa[i]['local']['username'])
            {
                    saveindex = i;
            }

        }

        //var emailofuser = resa[saveindex]['local']['email'];
        var firstname = resa[saveindex]['local']['firstname'];
        var lastname = resa[saveindex]['local']['lastname'];
        console.log(firstname);
         console.log(lastname);

        db.close();
        });

});



      return res.redirect('main');
    });
  })(req, res, next);
});


	app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');

    });

    app.get('/account-professor',function(req, res) {
        res.render('account-professor.ejs');

    });

    app.get('/surveys-students',checkAuthentication,checkperson,function(req,res)
    {

        req.session.session = {
            title: req.body.username
        };

        var temp = app.get('data').title;
        console.log(app.get('data'));

    });

    function checkperson(req, res,db)
    {
  var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

MongoClient.connect('mongodb://127.0.0.1:27017/main', function(err, db) {
    if(err) throw err;

    var collection = db.collection('users');
    var person = app.get('data').title;

    // Locate all the entries using find
    collection.find().toArray(function(err, results) {
        var resa = results;
        var saveindex = 10;
        for(i=0;i<resa.length;i++)
        {
            if(person == resa[i]['local']['username'])
            {
                    saveindex = i;
            }

        }


        var emailofuser = resa[saveindex]['local']['email'];
        var accounttypeuser = resa[saveindex]['local']['accounttype'];
        console.log("HEH");
        console.log(emailofuser);

        // Andrew, Ali and Ahmad, look here

        if(accounttypeuser == "student")
        {
           // here, we replace the username with the values returned from the find query above. For the query, we need to select
           res.render('surveys-students.ejs');
        }
        else if (accounttypeuser == "teacherta")
        {
            var MongoClient = require('mongodb').MongoClient
            var URL = 'mongodb://localhost:27017/mydatabase'

            MongoClient.connect(URL, function(err, db) {
              if (err) return

              var collection = db.collection('surveysvalues');

              // Render the surveyr results page page if account is a teacher/ta
              collection.find({}).toArray(function(err, docs){
                    if(err) return;
                    // Send the documents from the database collection to the client to process.
                    res.render('survey-results.ejs', {docs: docs});
              });

            });

        }
        db.close();
        });

});


    }

    app.get('/myProfile',checkAuthentication,function(req,res)
    {

		res.render('myProfile.ejs');

        req.session.session = {
            title: req.body.username
        };

        var temp = app.get('data').title;
        console.log(app.get('data'));

    });

    app.get('/surveys-s2',checkAuthentication,function(req,res)
        {
        res.render('ss-results')
        console.log(req.query.radioo)
         console.log(req.query.mylittletextbox)
          console.log(req.query.fname)
    var MongoClient = require('mongodb').MongoClient

var URL = 'mongodb://localhost:27017/mydatabase'
MongoClient.connect(URL, function(err, db) {
  if (err) return

  var collection = db.collection('surveysvalues')
  collection.insert({question1:req.query.radioo, comments: req.query.mylittletextbox}, function(err, result) {
    collection.find({name: req.query.radioo}).toArray(function(err, docs) {
      console.log(docs[0])
      db.close()
    })
  })
});
    });

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // to support JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

    var profileSchema = new mongoose.Schema({
      firstName: String,
      lastName: String,
      idNumber: String,
      major: String
    });

    var profileModel = mongoose.model('Profiles', profileSchema);

app.get('/submitProfileInfo',checkAuthentication,function(req,res)
    {
      res.render('myProfile');
      console.log(req.query.firstname);
      console.log(req.query.lastname);
      console.log(req.query.IdNum);
      console.log(req.query.major);

      var firstName = req.query.firstname;
      var lastName = req.query.lastname;
      var IdNum = req.query.IdNum;
      var major = req.query.major;

      //Saving data in Profiles collection in main (default) database

      var prof = new profileModel({
        firstName:firstName,
        lastName:lastName,
        idNumber:IdNum,
        major: major
      });

       prof.save(function (err) {if (err) console.log ('Error on save!')});


     });
app.post('/surveys',function(req,res){


});


    app.get('/forum',checkAuthentication,getuserUsername,function(req,res)
    {

        req.session.session = {
            title: req.body.email
        };

        var temp = app.get('data').title;
        //console.log(app.get('data'));


    });

    function getuserUsername(req, res,db)
    {
  var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

MongoClient.connect('mongodb://127.0.0.1:27017/main', function(err, db) {
    if(err) throw err;

    var collection = db.collection('users');
    var person = app.get('data').title;

    // Locate all the entries using find
    collection.find().toArray(function(err, results) {
        var resa = results;
        var saveindex = 10;
        for(i=0;i<resa.length;i++)
        {
            if(person == resa[i]['local']['username'])
            {
                    saveindex = i;
            }

        }


        var usernameofuser = resa[saveindex]['local']['username'];
        var accounttypeuser = resa[saveindex]['local']['accounttype'];
        //console.log(usernameofuser);


        if(accounttypeuser == "student")
        {
           // here, we replace the username with the values returned from the find query above. For the query, we need to select
           res.render('forum-student.ejs');
        }
        else if (accounttypeuser == "teacherta")
        {
           res.render('forum-teacher.ejs');
            // render prof page if account is a teacher/ta

        }
        db.close();
        });

});


    }

    app.get('/forum-submitted-2',checkAuthentication,function(req,res)
        {
        // Please display values of
       res.render('forum-results-2.ejs');
        // display values of search in forum-results.ejs
      //  console.log("search result");
    //    console.log(req.query.title);
         //console.log(req.query.tags)

    var MongoClient = require('mongodb').MongoClient

var URL = 'mongodb://localhost:27017/mydatabase'
MongoClient.connect(URL, function(err, db) {
  if (err) return
  var collection = db.collection('forumvalues')
  if(req.query.title!="")
      {
  collection.insert({title:req.query.title, posted:req.query.mylittletextbox, tags: req.query.tags}, function(err, result) {
    collection.find({name: req.query.radioo}).toArray(function(err, docs) {
      //console.log(docs[0])
      db.close()
    })
  })
      }
  // Grab a cursor

      var cursor = collection.find({"tags":req.query.search});

      // Execute the each command, triggers for each document
      cursor.each(function(err,item) {
          if(item == null) {

          // Show that the cursor is closed
          cursor.toArray(function(err, items) {


            // Let's close the db
            db.close();
          });
        }
          else{
              console.log("HH");
          console.log(req.query.search);
           // display these values in forum-results-2.ejs

          }

      });
});

        //console.log(req.query.firstname)
    });

//hh
    app.get('/forum-submitted-3',checkAuthentication,function(req,res)
        {
        console.log(req.query.search);
        // Please display values of
        // display values of search in forum-results.ejs
        console.log("search result");
        //console.log(req.query.mylittletextbox);


    var MongoClient = require('mongodb').MongoClient

var URL = 'mongodb://localhost:27017/mydatabase'
MongoClient.connect(URL, function(err, db) {
  if (err) return
  var collection = db.collection('forumvalues')
  var string = req.query.search;


  var path;
db.collection('forumvalues', function(err, collection) {
    collection.find({}).toArray(function(err, results) {
        path = results;
        console.log(results);
         res.render('forum-results.ejs',{tag:"All",path:results});
    });
})


      var cursor = collection.find({"tags":req.query.search});



    cursor.toArray(function(err, items) {


          var a= cursor.each(function(err,item) {

          if(item == null) {

          // Show that the cursor is closed

        }
          else{
          d=item.posted;
          console.log(item.tags);
          console.log(item.posted);

          }

      });

          });
        })


});
    //hh

app.get('/forum-submitted',checkAuthentication,function(req,res)
        {
        console.log(req.query.search);
        // Please display values of
        // display values of search in forum-results.ejs
        console.log("search result");
        //console.log(req.query.mylittletextbox);


    var MongoClient = require('mongodb').MongoClient

var URL = 'mongodb://localhost:27017/mydatabase'
MongoClient.connect(URL, function(err, db) {
  if (err) return
  var collection = db.collection('forumvalues')
  var string = req.query.search;

  var pos = 0;
  var x = 0;
  var y = 0;
  var num = -1;
  var i = -1;
  //var graf = "#hi,#hokw,#ru,#hiii,#asdf";
  var arr_pos = [];
  var arr_pos_2 = [];

    while (pos != -1) {
    pos = string.indexOf(",", i + 1);
    arr_pos[x] = string.substring(y, pos);
    arr_pos_2[x] = pos+1;
    x++;
    y = pos+1;
    //document.write(y+"<br>");
    num += 1;
    i = pos;
  }
    arr_pos[num] = string.substring(arr_pos_2[num-1], string.length);

    console.log(arr_pos);
  var path;
db.collection('forumvalues', function(err, collection) {
    var args = (function(arr, elem) {
            var a2 = arr.map(function(e) { return e; }); // copy of arr
            a2.push(elem);
            return a2;
        })(arr_pos, req.query.search);
    collection.find({"tags":{ $in : args }
        }).sort({"tags":1}).toArray(function(err, results) {
        path = results;
        console.log(results);
         res.render('forum-results.ejs',{tag:req.query.search,path:results});
    });
})


      var cursor = collection.find({"tags":req.query.search});



    cursor.toArray(function(err, items) {


          var a= cursor.each(function(err,item) {

          if(item == null) {

          // Show that the cursor is closed

        }
          else{
          d=item.posted;
          console.log(item.tags);
          console.log(item.posted);

          }

      });

          });
        })


});




	app.post('/submitted', function(req,res,next) {

    passport.authenticate('local-signup',function(err,user,info)
    {

        if (err) { return next(err); }
    // Redirect if it fails
    if (!user) { return res.redirect('/signup'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      // Redirect if it succeeds
        //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
    var mailgun = new Mailgun({apiKey: api_key, domain: domain});

		 req.session.session = {
            title: req.body.username
        };
		console.log(req.session.session.title);
    var data = {
    //Specify email data
      from: from_who,
    //The email to contact
      to: req.body.email,

    //Subject and text data
      subject: 'Successful Account Creation Connect Concordia',
      html: 'Hi,'+
        '<br/>This is just to confirm that you have successfully created an account with Connect Concordia. You will now be able to enjoy a state of the art service designed to faciliate communication between school faculty.'
    }


    //Invokes the method to send emails given the above data with the helper library
    mailgun.messages().send(data, function (err, body) {
        //If there is an error, render the error page
        if (err) {
            res.render('error', { error : err});
            console.log("got an error: ", err);
        }
        //Else we can greet    and leave
        else {
            //Here "submitted.jade" is the view file for this landing page
            //We pass the variable "email" from the url parameter in an object rendered by Jade
            //res.render('submitted', { email : req.params.email });
            res.render('main');
            console.log(req.body.email);
        }
    });

      return res.redirect('/main');
    });
  })(req, res, next);


});
};




// Confirm user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated, continue
    if (req.isAuthenticated())
        {
           return next();
        }


    else
        { // otherwise redirect them to the home page

            res.redirect('/');

        }

}