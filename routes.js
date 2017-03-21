/*var MongoClient = require('mongodb').MongoClient

var URL = 'mongodb://localhost:27017/mydatabase'
MongoClient.connect(URL, function(err, db) {
  if (err) return
  var collection = db.collection('food')
  collection.insert({name: "helloclau", tasty: true}, function(err, result) {
    collection.find({name: 'taco'}).toArray(function(err, docs) {
      db.close()
    })
  })
});*/

passport = require('passport');
app = require('express')();

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var assert = require('assert');
mongoose.Promise = require('bluebird');


passport = require('passport');
app = require('express')();

//new shit
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

   //ar collection = db.collection('test_insert1');
    app.post('/signup',passport.authenticate('local-signup', {
        successRedirect : '/chat', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }), function(req, res) {
    var username = req.body.email;
    var collection = db.collection('emails_tester');
        
   /* collection.insert({email:username}, function(err, docs) {
        collection.count(function(err, count) {
            console.log(format("count = %s", count));
            db.close();
        });
    });
    console.log("post received: %s %s", username);
        
    res.render('profile.ejs', { }); */
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
    
     // Login page
    /*app.get('/signup', function(req, res) {

        res.render('signup.ejs', { message: req.flash('loginMessage') }); 
    });*/
   
    
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
    
    
    app.get('/chat', checkAuthentication, function(req, res) {
        res.render('chat.ejs', { email:req.session.session
            //user : req.user // get the user out of session and pass to template
        });
        
    
        
        console.log(req.session.session);
        // passing data from one page to the other
        app.set('data', req.session.session);
    
    });
    function checkAuthentication(req,res,next){
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

	app.get('/submitted', function(req, res) {

        res.render('chat.ejs', { message: req.flash('loginMessage')}); 
        
    });
    // process the login form
    /*app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/chat', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        //failureFlash : true // allow flash messages
    }));*/
 app.get('/main', checkAuthentication, function(req, res) {
        res.render('main.ejs', { email:req.session.session
            //user : req.user // get the user out of session and pass to template
        });
        
    
        
        console.log(req.session.session);
        // passing data from one page to the other
        app.set('data', req.session.session);
    
    });
  var session = require('express-session'); 
 app.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
      console.log(req.body.email);
    if (err) { return next(err); }
    // Redirect if it fails
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      // Redirect if it succeeds
        req.session.session = {
            title: req.body.email
        };
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
            title: req.body.email
        };
        /*res.render('surveys-students.ejs',{retrievedData : app.get('data')})*/
        var temp = app.get('data').title;
        console.log(app.get('data'));
       
        //app.set('d', req.session);

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
            if(person == resa[i]['local']['email'])
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
           // here, we replace the email with the values returned from the find query above. For the query, we need to select 
           res.render('surveys-students.ejs');     
        }
        else if (accounttypeuser == "teacherta")
        {
            res.render('surveys-teachers.ejs');
            // render prof page if account is a teacher/ta
            // Andrew, please edit the surveys-teachers.ejs page, add your code !!!
            
        }
        db.close();
        });
   
});
    
    
    }
    
    app.post('/surveys-students',function(req,res)
           {
        //res.redirect('ss-results.ejs')

    });
    
    app.get('/surveys-s2',checkAuthentication,function(req,res)
        {
        res.render('ss-results')
        console.log(req.query.radioo)// works!!
         console.log(req.query.mylittletextbox)// works!!
          console.log(req.query.fname)// works!!
        //console.log(a);
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
        //console.log(req.query.firstname)
    });
    
var bodyParser = require('body-parser'); 
app.use(bodyParser.json()); // to support JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

app.post('/surveys',function(req,res){

    //console.log(req.body.radioo);

});
    
   //here
    app.get('/forum',checkAuthentication,haha,function(req,res)
    {
        
        req.session.session = {
            title: req.body.email
        };
        
        var temp = app.get('data').title;
        console.log(app.get('data'));
       
        //app.set('d', req.session);

    });

    function haha(req, res,db)
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
            if(person == resa[i]['local']['email'])
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
           // here, we replace the email with the values returned from the find query above. For the query, we need to select 
           res.render('forum-student.ejs');     
        }
        else if (accounttypeuser == "teacherta")
        {
           res.render('forum-teacher.ejs');
            // render prof page if account is a teacher/ta
            // Andrew, please edit the surveys-teachers.ejs page, add your code !!!
            
        }
        db.close();
        });
   
});
    
    
    }
    
    //h
    app.get('/forum-submitted-2',checkAuthentication,function(req,res)
        {
        // Please display values of 
       res.render('forum-results-2.ejs');
        // display values of search in forum-results.ejs
        console.log("search result");
        console.log(req.query.mylittletextbox);
         //console.log(req.query.tags)

    var MongoClient = require('mongodb').MongoClient

var URL = 'mongodb://localhost:27017/mydatabase'
MongoClient.connect(URL, function(err, db) {
  if (err) return
  var collection = db.collection('forumvalues')
  collection.insert({posted:req.query.mylittletextbox, tags: req.query.tags}, function(err, result) {
    collection.find({name: req.query.radioo}).toArray(function(err, docs) {
      //console.log(docs[0])
      db.close()
    })
  })
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
           // Guys
          console.log("HH");
          }
          //console.log(req.query.tags);
          
        //console.log("penguins");
          //console.log(item.posted);
      });
});
         
        //console.log(req.query.firstname)
    });
    //h
    //here
    
    app.get('/forum-submitted',checkAuthentication,function(req,res)
        {
        // Please display values of 
       res.render('forum-results.ejs');
        // display values of search in forum-results.ejs
        console.log("search result");
        console.log(req.query.mylittletextbox);
         //console.log(req.query.tags)

    var MongoClient = require('mongodb').MongoClient

var URL = 'mongodb://localhost:27017/mydatabase'
MongoClient.connect(URL, function(err, db) {
  if (err) return
  var collection = db.collection('forumvalues')
  collection.insert({posted:req.query.mylittletextbox, tags: req.query.tags}, function(err, result) {
    collection.find({name: req.query.radioo}).toArray(function(err, docs) {
      //console.log(docs[0])
      db.close()
    })
  })
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
          console.log(item.tags);
          console.log(item.posted);
           // display these values in forum-results.ejs
           // Guys
          console.log("HH");
          }
          //console.log(req.query.tags);
          
        //console.log("penguins");
          //console.log(item.posted);
      });
});
         
        //console.log(req.query.firstname)
    });
    /*app.get('/forum',checkAuthentication,function(req,res)
    {
            res.render('forum-teacher')
    });*/
    
    

	app.post('/submitted', function(req,res,next) {

    passport.authenticate('local-signup',function(err,user,info)
    { 
        var a = req.body.email;
        if (err) { return next(err); }
    // Redirect if it fails
    if (!user) { return res.redirect('/signup'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      // Redirect if it succeeds
        //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
    var mailgun = new Mailgun({apiKey: api_key, domain: domain});

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
            //res.render('submitted', { email : req.params.username });
            res.render('chat'); 
            console.log(req.body.email);
        }
    });

      return res.redirect('/chat');
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

