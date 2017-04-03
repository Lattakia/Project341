
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
       res.render('chat.ejs', {firstname:firstname,lastname:lastname}
            //user : req.user // get the user out of session and pass to template
        );
        db.close();
        });

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

        var userName = resa[saveindex]['local']['firstname']+" "+resa[saveindex]['local']['lastname'];
        var emailofuser = resa[saveindex]['local']['email'];
        var accounttypeuser = resa[saveindex]['local']['accounttype'];

        console.log(emailofuser);

        // Andrew, Ali and Ahmad, look here

        if(accounttypeuser == "student")
        {
            var MongoClient = require('mongodb').MongoClient
            var URL = 'mongodb://localhost:27017/surveydatabase' // to change to survey database

            MongoClient.connect(URL, function(err, db) {
              if (err) return

              var collection = db.collection('survey_form'); // to change to survey collection

              // Render the teacher's survey (note: have to get any teacher's survey here, put code to find teacher's name).
              collection.find({Name: "ccProf"}).toArray(function(err, docs){
                    if(err) return;
                    // Send the documents from the database collection to the client to process.
                    res.render('surveys-students.ejs', {survey: docs[0]});
              });

            });

        }
        else if (accounttypeuser == "teacherta")
        {
            // displays survey page that teacher can use to create questions
            res.render('survey_teacher.ejs', {teacherName: userName})
        }
        db.close();
        });

});


    }

    app.get('/survey_result', function(req,res){
      var MongoClient = require('mongodb').MongoClient
            var URL = 'mongodb://localhost:27017/mydatabase'

            MongoClient.connect(URL, function(err, db) {
              if (err) return

              var collection = db.collection('surveysvalues');

              // Render the surveyr results page page if account is a teacher/ta
              collection.find({}).toArray(function(err, docs){
                    if(err) return;
                    // Send the documents from the database collection to the client to process.
                    res.render('survey-results.ejs', {dbSurveyDocs: docs});
              });

            });
    });

    app.get('/teacher_submitted', function(req,res){
    
    res.render('teacher_submitted.ejs')
  var MongoClient = require('mongodb').MongoClient
  
var URL_1 = 'mongodb://localhost:27017/surveydatabase'
MongoClient.connect(URL_1, function(err, db) {
  if (err) return
  
            var collection = db.collection('survey_form')
            var name = app.get('data').title;
            console.log(name);

            //Work around to change boolean because there's no pass by reference in js
            function switchBoolean(state){
              state.bool = true;
            }

            collection.find().toArray(function(err,results){
                var res = results;
                var boolean = {bool: false};
                for(i=0;i<res.length;i++){
                    if(name == res[i]['Name']){
                      switchBoolean(boolean);
                      console.log("true: "+boolean.bool);

                      //Updates the database with new questions
                      collection.update({Name:name},
                      {Name:name,
                      Question_1:req.query.question1, 
                      Question_2:req.query.question2, 
                      Question_3:req.query.question3, 
                      Question_4:req.query.question4, 
                      Question_5:req.query.question5}, 
                      function(err, results) {
                        db.close()
                      })
                    }}
                      
                      //Only insert if database doesn't contain the doc with the specific email
                      if(boolean.bool == false){
                        collection.insert({
                      Name:name,
                      Question_1:req.query.question1, 
                      Question_2:req.query.question2, 
                      Question_3:req.query.question3, 
                      Question_4:req.query.question4, 
                      Question_5:req.query.question5}, 
                      function(err, results) {
                        db.close()
                      })
                }
            });
        })
    });

    app.get('/myProfile',checkAuthentication,function(req,res)
    {

		res.render('myProfile.ejs');

        req.session.session = {
            title: req.body.username
        };

        var temp = app.get('data').title;
        console.log(app.get('data'));

    });

    app.get('/survey_selection',checkAuthentication,function(req,res)
    {
      var MongoClient = require('mongodb').MongoClient
      var URL_1 = 'mongodb://localhost:27017/main'
      var dataArray = new Array();
      MongoClient.connect(URL_1, function(err, db){
      if(err) return
      
      function renderThis(data){
        console.log("huehue "+dataArray.length);
        res.render('survey_selection.ejs', {data : dataArray});
      }

      var collection = db.collection('users');
      collection.find().toArray(function(err,results){
        if(err) return;
        
        var res = results;
        for(var i = 0; i<res.length; i++){
        if(res[i]['local']['accounttype'] == "teacherta"){
            var tmp = {
              fname: res[i]['local']['firstname'],
              lname: res[i]['local']['lastname']
            };

            dataArray.push(tmp);
            console.log("Info is "+JSON.stringify(dataArray));
            }
          }
            renderThis(dataArray);
        });

            req.session.session = {
              title: req.body.username
            };

            var temp = app.get('data').title;
            console.log(app.get('data'));
      });
    });

    app.get('/surveys-s2',checkAuthentication,function(req,res)
        {
        res.render('ss-results')
        console.log(req.query.radioo)
         console.log(req.query.mylittletextbox)
          console.log(req.query.fname)
    var MongoClient = require('mongodb').MongoClient

    var URLMain = 'mongodb://localhost:27017/main';
    var URLMyDataBase = 'mongodb://localhost:27017/mydatabase';

    var studentUserNameVal = '';
    // Find currently logged in student
    MongoClient.connect(URLMain, function(err, db){
        if(err) return;

        var collection = db.collection('users');
        var person = req.session.session.title;

        // Locate all the entries using find
        collection.find().toArray(function(err, results) {
            var resa = results;
            var saveindex = 0;
            
            for(var i=0;i<resa.length;i++)
            {
                if(person == resa[i]['local']['email'])
                {
                        saveindex = i;
                }
               
            }
            studentUserNameVal = resa[saveindex]['local']['username'];
            db.close();
    });

      MongoClient.connect(URLMyDataBase, function(err, db) {
        if (err) return

        var collection = db.collection('surveysvalues');
        var surveyResponsesVal = {
          question1: req.query.radio1,
          question2: req.query.radio2, 
          question3: req.query.radio3, 
          question4: req.query.radio4, 
          question5: req.query.radio5, 
          comments: req.query.mylittletextbox};
        var surveyResponsesObj = {
          studentUserName: studentUserNameVal,
          updated: false,
          surveyResponses: surveyResponsesVal
        };

        // Will be compared with each other to see if the student has answered the survey or not
        var oldSurveyResults = null; // Survey results before any operation
        var newSurveyResultsInserted = null; // Survey results after first findAndModify
        var newSurveyResultsUpdated = null; // Survey results after second findAndModify

        // Get unmodified document
        collection.find({studentUserName: studentUserNameVal}).toArray(function(err, results){
          oldSurveyResults = results[0];
        });

          // If a response entry for a student does not exist at all, insert it.
        collection.update({studentUserName: studentUserNameVal}, {$setOnInsert: {updated: false, surveyResponses: surveyResponsesVal}}, {upsert: true});

        // Get inserted document
        collection.find({studentUserName: studentUserNameVal}).toArray(function(err, results){
          newSurveyResultsInserted = results[0];
          console.log(newSurveyResultsInserted);
        });

        // Otherwise, if a response for a student exists but the survey has been updated, update the values and set the update flag to false.
        collection.update({studentUserName: studentUserNameVal, updated: true}, {$set: {updated: false, surveyResponses: surveyResponsesVal}});

        // Get updated document
        collection.find({studentUserName: studentUserNameVal}).toArray(function(err, results){
          newSurveyResultsUpdated = results[0];
          res.render('ss-results', {oldResults: JSON.stringify(oldSurveyResults), insertedResults: JSON.stringify(newSurveyResultsUpdated), updatedResults: JSON.stringify(newSurveyResultsUpdated)});
        });

        db.close();
      });
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

    app.get('/forum',checkAuthentication,getuserUsername,function(req,res)
    {
        console.log("HHHHHH");

        req.session.session = {
            title: req.body.email
        };

        var temp = app.get('data').title;
        //console.log(temp);


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
    
    var today = new Date();
var dd = today.getDate();
var mm = today.getMonth();
var year = today.getFullYear();
var months = ['January','February','March','April'];
var thedate = months[mm]+" "+dd+" , "+year;

var URL = 'mongodb://localhost:27017/mydatabase'
MongoClient.connect(URL, function(err, db) {
  if (err) return
  var collection = db.collection('forumvalues')
  if(req.query.title!="")
      {

  collection.insert({title:req.query.title, posted:req.query.mylittletextbox, tags: req.query.tags,username: app.get('data').title,date:thedate}, function(err, result) {
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
       console.log("search result");
        var username = app.get('data').title;
        //console.log(username);
        //console.log(req.query.search);
        // Please display values of
        // display values of search in forum-results.ejs
        //console.log("search result");
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



    
  var path;
    var username = app.get('data').title;
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
         res.render('forum-results.ejs',{tag:req.query.search,path:results,username:username});
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

//here

//here


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
