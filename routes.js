
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
var session = require('express-session');

var bodyParser = require('body-parser'); 
app.use(bodyParser.json()); // to support JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

// Used to connect to a database.
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
var URLMain = 'mongodb://127.0.0.1:27017/main';
var URLMyDataBase = 'mongodb://127.0.0.1:27017/mydatabase';
var URLSurveyDataBase = 'mongodb://127.0.0.1:27017/surveydatabase';

var appObj = {

  checkAuthentication : function (req,res,next){
    if(req.isAuthenticated()){
        //if user is looged in, req.isAuthenticated() will return true
        next();
    } else{
        res.redirect("/");
    }
},

    // Made for the survey page, checks the type of user and directs him/her to the appropriate survey page.    
  displayAppropriateSurveyPage: function(req, res){

  
var dataArray = new Array();
MongoClient.connect(URLMain, function(err, db) {
    if(err) throw err;

    var collection = db.collection('users');
    var person = req.session.session.title;

    // Locate all the entries using find
    collection.find({'local.username' : person}).toArray(function(err, results) {
        var currLoggedInUser = results[0];

        var firstname = currLoggedInUser['local']['firstname'];
        var lastname = currLoggedInUser['local']['lastname'];

        var userName = firstname + " " + lastname;
        var accounttypeuser = currLoggedInUser['local']['accounttype'];

        var arrayOfProfessorNames = new Array();
        // If the user is a student, direct him/her to the survey selection page
        if(accounttypeuser == "student")
        {
                function renderThis(dataArray){
                  res.render('survey_selection.ejs', {data : dataArray});
                }

                collection.find().toArray(function(err,results){
                  if(err) return;
                  
                  var res = results;
                  for(var i = 0; i<res.length; i++){
                  if(res[i]['local']['accounttype'] == "teacherta"){
                      var tmp = {
                        fname: res[i]['local']['firstname'],
                        lname: res[i]['local']['lastname']
                      };

                      arrayOfProfessorNames.push(tmp);
                      }
                    }
                    db.close();
                    renderThis(arrayOfProfessorNames);
                      
                  });
        }
        // If the user is a teacher/TA, direct him/her to the survey creation page
        else if (accounttypeuser == "teacherta")
        {
          // displays survey page that teacher can use to create questions
            res.render('survey_teacher.ejs', {teacherName: userName})
        }
        db.close();
        });

});

    },

    displaySurveyResults: function(req,res){

            var profSurveyMaker = '';
            MongoClient.connect(URLMain, function(err, db){
                  if(err) return;

                  var collection = db.collection('users');
                  var profSurveyMaker = req.session.session.title;

                  collection.find({'local.username': profSurveyMaker}).toArray(function(err, docs){
                    if(err) return;

                      var profSurveyMakerName = docs[0]['local']['firstname'] + " " + docs[0]['local']['lastname'];
                      MongoClient.connect(URLSurveyDataBase, function(err, db) {
                        if (err) return

                        var collectionSurvey = db.collection('survey_values');

                        collectionSurvey.find({surveyMakerName : profSurveyMakerName}).toArray(function(err, docs){
                              if(err) return;
                              // Send the documents from the database collection to the client to process.
                              res.render('survey-results.ejs', {dbSurveyDocs: docs});
                              db.close();
                        });

                      });

                  });

                db.close();
            });
    },

    displayMainPage: function(req, res) {

MongoClient.connect(URLMain, function(err, db) {
    if(err) throw err;

    var collection = db.collection('users');
    var person = req.session.session.title;

    collection.find({'local.username' : person}).toArray(function(err, results) {
        var currLoggedInUser = results[0];

        var firstname = currLoggedInUser['local']['firstname'];
        var lastname = currLoggedInUser['local']['lastname'];

       res.render('main.ejs', {firstname:firstname,lastname:lastname}

        );
        db.close();
        });

});

        // passing data from one page to the other
        app.set('data', req.session.session);

    },

    displaySurveysStudents : function(req, res){
       

MongoClient.connect(URLMain, function(err, db) {
    if(err) throw err;

    var collection = db.collection('users');
    var person = req.session.session.title;//app.get('data').title;

    collection.find({'local.username' : person}).toArray(function(err, results) {
        var currLoggedInUser = results[0];

        var userName = currLoggedInUser['local']['firstname'] + " " + currLoggedInUser['local']['lastname'];
        var emailofuser = currLoggedInUser['local']['email'];
        var accounttypeuser = currLoggedInUser['local']['accounttype'];

        if(accounttypeuser == "student")
        {
              var profName = req.query.teacher;
              var profNameArr = profName.split(" ");
              var profFirstName = profNameArr[0];
              var profLastName = profNameArr[1];
              collection.find({'local.firstname': profFirstName, 'local.lastname': profLastName}).toArray(function(err, docs){
                    if(err) return;
                    surveyMaker = docs[0];
                    MongoClient.connect(URLSurveyDataBase, function(err, db) {
                        if (err) return
                        var collectionSurvey = db.collection('survey_form');
                        // Render the teacher's survey (note: have to get any teacher's survey here, put code to find teacher's name).
                        collectionSurvey.find({Name: surveyMaker['local']['username']}).toArray(function(err, docs){
                              if(err) return;
                              // Send the documents from the database collection to the client to process.
                              if(docs.length == 0){
                                res.render('no-survey.ejs', {surveyMakerName: profName});
                              } else {
                                res.render('surveys-students.ejs', {surveyMakerName: profName, survey: docs[0]});
                              }
                              
                        });
                        db.close();
                  });
              });
        }

        db.close();
        });

    });
},

displayTeacherSubmitted : function(req,res){
    
    res.render('teacher_submitted.ejs')
  
MongoClient.connect(URLSurveyDataBase, function(err, db) {
  if (err) return
  
            var collectionForm = db.collection('survey_form')
            var name = req.session.session.title;//app.get('data').title;

            //Work around to change boolean because there's no pass by reference in js
            function switchBoolean(state){
              state.bool = true;
            }

            collectionForm.find().toArray(function(err,results){
                var res = results;
                var boolean = {bool: false};
                for(i=0;i<res.length;i++){
                    if(name == res[i]['Name']){
                      switchBoolean(boolean);

                      //Updates the database with new questions
                      collectionForm.update({Name:name},
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
                        collectionForm.insert({
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
                else{
                    // Upon updating the survey form for the professor/TA, also update the 'updated' flag
                    // in the survey responses for this professor's/TA's survey to true so that students
                    // may answer it again.
                    MongoClient.connect(URLMain, function(err, db) {
                         if (err) return
                         var collectionUsers = db.collection('users');
                         collectionUsers.find({'local.username': name}).toArray(function(err, docs){

                            var surveyMaker = docs[0]['local']['firstname'] + " " + docs[0]['local']['lastname'];

                            MongoClient.connect(URLSurveyDataBase, function(err, db) { 
                              if (err) return 
                                var collectionValues = db.collection('survey_values')
                                collectionValues.update({surveyMakerName: surveyMaker}, {$set: {updated : true}}, function(err, results){
                                })

                              db.close()
                            })

                         })
                          db.close()

                       })
                     db.close()
                }
            });
        })
    },

    displaySurveyStudentSubmitted : function(req,res){

    // Find currently logged in student
    MongoClient.connect(URLMain, function(err, db){
        if(err) return;

        var collection = db.collection('users');
        var studentUserNameVal = req.session.session.title;

      MongoClient.connect(URLSurveyDataBase, function(err, db) {
        if (err) return
        var surveyMaker = req.query.surveyMaker;
        var collection = db.collection('survey_values');
        var surveyResponsesVal = {
          question1: req.query.radio1,
          question2: req.query.radio2, 
          question3: req.query.radio3, 
          question4: req.query.radio4, 
          question5: req.query.radio5, 
          comments: req.query.mylittletextbox};
        var surveyResponsesObj = {
          studentUserName: studentUserNameVal,
          surveyMakerName : surveyMaker,
          updated: false,
          surveyResponses: surveyResponsesVal
        };

        // Will be compared with each other to see if the student has answered the survey or not
        var oldSurveyResults = null; // Survey results before any operation
        var newSurveyResultsInserted = null; // Survey results after first findAndModify
        var newSurveyResultsUpdated = null; // Survey results after second findAndModify

        // Get unmodified document
        collection.find({studentUserName: studentUserNameVal, surveyMakerName: surveyMaker}).toArray(function(err, results){
          oldSurveyResults = results[0];
        });

          // If a response entry for a student does not exist at all, insert it.
        collection.update({studentUserName: studentUserNameVal, surveyMakerName: surveyMaker}, {$setOnInsert: {updated: false, surveyResponses: surveyResponsesVal}}, {upsert: true});

        // Get inserted document
        collection.find({studentUserName: studentUserNameVal, surveyMakerName: surveyMaker}).toArray(function(err, results){
          newSurveyResultsInserted = results[0];
        });

        // Otherwise, if a response for a student exists but the survey has been updated, update the values and set the update flag to false.
        collection.update({studentUserName: studentUserNameVal, surveyMakerName: surveyMaker, updated: true}, {$set: {updated: false, surveyResponses: surveyResponsesVal}});

        // Get updated document
        collection.find({studentUserName: studentUserNameVal, surveyMakerName: surveyMaker}).toArray(function(err, results){
          newSurveyResultsUpdated = results[0];
          res.render('ss-results', {oldResults: JSON.stringify(oldSurveyResults), insertedResults: JSON.stringify(newSurveyResultsUpdated), updatedResults: JSON.stringify(newSurveyResultsUpdated)});
        });

        db.close();
      });
    });
},

 displayAppropriateForumPage: function (req, res,db) {

        MongoClient.connect(URLMain, function(err, db) {
            if(err) throw err;

            var collection = db.collection('users');
            var person = req.session.session.title;//app.get('data').title;

            collection.find({'local.username' : person}).toArray(function(err, results) {
                var currLoggedInUser = results[0];

                var accounttypeuser = currLoggedInUser['local']['accounttype'];

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
    },

    displayForumSubmitted_2 : function(req,res) {

       res.render('forum-results-2.ejs');
    
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth();
    var year = today.getFullYear();
    var months = ['January','February','March','April'];
    var thedate = months[mm]+" "+dd+" , "+year;

MongoClient.connect(URLMyDataBase, function(err, db) {
  if (err) return
  var collection = db.collection('forumvalues')
  if(req.query.title!="") {

  collection.insert({title:req.query.title, posted:req.query.mylittletextbox, tags: req.query.tags,username: req.session.session.title,date:thedate}, function(err, result) {
    db.close();
  });
    }

  db.close();
});

    },

    displayForumSubmitted_3 : function(req,res) {

MongoClient.connect(URLMyDataBase, function(err, db) {
  if (err) return
  var collection = db.collection('forumvalues')
  var string = req.query.search;

  var path;
db.collection('forumvalues', function(err, collection) {
    collection.find({}).toArray(function(err, results) {
        path = results;

         res.render('forum-results.ejs',{tag:"All",path:results});
    });
});

    });
},

    displayForumSubmitted : function(req,res) {
       console.log("search result");
        var username = req.session.session.title;//app.get('data').title;

        MongoClient.connect(URLMyDataBase, function(err, db) {
          if (err) return
          var collection = db.collection('forumvalues')
          var string = req.query.search;

          var pos = 0;
          var x = 0;
          var y = 0;
          var num = -1;
          var i = -1;
          var arr_pos = [];
          var arr_pos_2 = [];

            while (pos != -1) {
            pos = string.indexOf(",", i + 1);
            arr_pos[x] = string.substring(y, pos);
            arr_pos_2[x] = pos+1;
            x++;
            y = pos+1;
            num += 1;
            i = pos;
          }
            arr_pos[num] = string.substring(arr_pos_2[num-1], string.length);

          var path;
            var username = req.session.session.title;//app.get('data').title;
        db.collection('forumvalues', function(err, collection) {
            var args = (function(arr, elem) {
                    var a2 = arr.map(function(e) { return e; }); // copy of arr
                    a2.push(elem);
                    return a2;
                })(arr_pos, req.query.search);
            collection.find({"tags":{ $in : args }
                }).sort({"tags":1}).toArray(function(err, results) {
                path = results;
                 res.render('forum-results.ejs',{tag:req.query.search,path:results,username:username});
            });
        })

        });

},

    submittedSignUpInfo : function(req,res,next) {

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


},

    login : function(req, res, next) {

  passport.authenticate('local-login', function(err, user, info) {

    if (err) { return next(err); }
    // Redirect if it fails
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      // Redirect if it succeeds
        req.session.session = {
            title: req.body.username
        };

  

    MongoClient.connect(URLMain, function(err, db) {
        if(err) throw err;

        var collection = db.collection('users');
        var person = req.session.session.title;

        collection.find({'local.username' : person}).toArray(function(err, results) {
            var currLoggedInUser = results[0];

        var firstname = currLoggedInUser['local']['firstname'];
        var lastname = currLoggedInUser['local']['lastname'];

            console.log(firstname);
             console.log(lastname);

            db.close();
            });

    });

      return res.redirect('main');
    });
  })(req, res, next);
},

    displayChat : function (req, res) {
        var MongoClient = require('mongodb').MongoClient,
            format = require('util').format;

        MongoClient.connect(URLMain, function (err, db) {
            if (err) throw err;

            var collection = db.collection('users');
            var person = req.session.session.title;

            // Locate all the entries using find
            collection.find({'local.username' : person}).toArray(function (err, results) {
                var currLoggedInUser = results[0];

                var firstname = currLoggedInUser['local']['firstname'];
                var lastname = currLoggedInUser['local']['lastname'];

                res.render('chat.ejs', {
                        firstname: firstname,
                        lastname: lastname
                    }

                );
                db.close();
            });

        });

        // passing data from one page to the other
        app.set('data', req.session.session);

    },

    displayPrivateChat : function (req, res) {

        MongoClient.connect(URLMain, function (err, db) {
            if (err) throw err;

            var collection = db.collection('users');
            var person = req.session.session.title;

            // Locate all the entries using find
            collection.find().toArray(function (err, results) {
                var currLoggedInUser = results[0];

                var firstname = currLoggedInUser['local']['firstname'];
                var lastname = currLoggedInUser['local']['lastname'];

                res.render('private-chat.ejs', {
                        firstname: firstname,
                        lastname: lastname
                    }
                );
                db.close();
            });

        });

        // passing data from one page to the other
        app.set('data', req.session.session);

    },

  runApp : function(app, passport) {

    // Home page
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });


    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });


    app.get('/chat', appObj.checkAuthentication, appObj.displayChat);
    
     app.get('/private-chat', appObj.checkAuthentication, appObj.displayPrivateChat);

     app.get('/login', function(req, res) {

        res.render('login.ejs', { message: req.flash('loginMessage')
        });
    });

  app.get('/submitted', function(req, res) {

        res.render('chat.ejs', { message: req.flash('loginMessage')});

    });

 app.get('/main', appObj.checkAuthentication, appObj.displayMainPage);

  
 app.post('/login', appObj.login);


  app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');

    });

    app.get('/account-professor',function(req, res) {
        res.render('account-professor.ejs');

    });

    app.get('/surveys',appObj.checkAuthentication,appObj.displayAppropriateSurveyPage);

    app.get('/surveys-students',appObj.checkAuthentication, appObj.displaySurveysStudents);

    app.get('/survey_result', appObj.checkAuthentication, appObj.displaySurveyResults);

    app.get('/teacher_submitted', appObj.checkAuthentication, appObj.displayTeacherSubmitted);

    app.get('/surveys-s2',appObj.checkAuthentication, appObj.displaySurveyStudentSubmitted);

    app.get('/forum',appObj.checkAuthentication,appObj.displayAppropriateForumPage);

    app.get('/forum-submitted',appObj.checkAuthentication, appObj.displayForumSubmitted);

    app.get('/forum-submitted-2',appObj.checkAuthentication, appObj.displayForumSubmitted_2);

    app.get('/forum-submitted-3',appObj.checkAuthentication, appObj.displayForumSubmitted_3);
    
    app.post('/submitted', appObj.submittedSignUpInfo);


/* ================START OF PROFILE==================== */

var userModel=require('./user');
var studentProfileModel=require('./models/studentProfileModel');
var teacherProfileModel=require('./models/teacherProfileModel');
var fs = require('fs');
const fileUpload = require('express-fileupload');
app.use(fileUpload());

  app.post('/profile',function(req,res){

    var username = req.session.session.title;//app.get('data').title;
    var profilePicsDir= __dirname + '/views/profilePictures';
    var profilePicsDirName = 'profilePictures';
    var defaultPic = 'profile-icon-300x300.png';
    var picturePath = defaultPic;

    if(req.files){

      var profilePic = req.files.profilePic;

      if(profilePic!=null){
      picturePath =  profilePicsDirName + '/' + username+'.jpg';
      profilePic.mv(profilePicsDir+'/'+ username + '.jpg', function(err) {
          if (err){
            return res.status(500).send(err);
          }

        });
      }else if(fs.existsSync(profilePicsDir+'/'+ username + '.jpg')){
      picturePath =  profilePicsDirName + '/' + username+'.jpg';
    }
    
    
      }


    console.log("(-----------)");
    console.log(__dirname);


    var username = req.session.session.title;//app.get('data').title;
    var users = require('./user');

    var accounttype;


    users.findOne({ 'local.username': username }, function (err, doc){
      if(doc){
        accounttype = doc.local.accounttype;
        console.log(accounttype);
        doc.local.firstname = req.body.firstName;
        doc.local.lastname = req.body.lastName;
        doc.local.idNumber = req.body.IdNum;
        doc.local.email = req.body.email;
        doc.save();

        //Store profile information based on accounttype

        if(accounttype=='student'){

          studentProfileModel.findOne({ 'username': username }, function (err, doc){

            if(doc){
              //profile exists in database
              doc.gender = req.body.gender;
              doc.major = req.body.major;
              doc.aboutMe = req.body.aboutMe;
              doc.picturePath = picturePath;
              doc.save();
            }else{
              //create profile in database
              var studentProfile = new studentProfileModel({
                username:username,
                gender:req.body.gender,
                major:req.body.major,
                aboutMe:req.body.aboutMe,
                picturePath:picturePath
              });
              studentProfile.save(function (err) {
                if (err) console.log ('Error when saving studentProfile!')
              });
            }

          });


        }else{
          teacherProfileModel.findOne({ 'username': username }, function (err, doc){

            if(doc){
              //profile exists in database
              doc.gender = req.body.gender;
              doc.department = req.body.department;
              doc.office = req.body.office;
              doc.officeHours = req.body.officeHours;
              doc.aboutMe = req.body.aboutMe;
              doc.picturePath = picturePath;
              doc.save();
            }else{
              //create profile in database
              var teacherProfile = new teacherProfileModel({
                username:username,
                gender:req.body.gender,
                department:req.body.department,
                office:req.body.office,
                officeHours:req.body.officeHours,
                aboutMe:req.body.aboutMe,
                picturePath:picturePath
              });
              teacherProfile.save(function (err) {
                if (err) console.log ('Error when saving teacherProfile!')
              });
            }

          });

        }

        res.redirect('/profiles/'+username);

      }else{
        //Cannot find username. May have been deleted or altered during the session.
        res.redirect('/main');
      }
    });

    console.log("The accounttype is " + accounttype);

  });


app.get('/editProfile',appObj.checkAuthentication,function(req,res){

  var username = req.session.session.title;//app.get('data').title;
  userModel.findOne({'local.username':username},function(error,user){

  console.log("USER is");
  console.log(user);

  if(error) throw error;

  if(user){

    var userObject = {
      userName: user.local.username,
      firstName: user.local.firstname,
      lastName: user.local.lastname,
      email: user.local.email,
      idNumber:user.local.idNumber
    };

    if(user.local.accounttype =='student'){

      var sProfileObject = {};
      studentProfileModel.findOne({ 'username': username }, function (err, doc){

        if (doc) {
          sProfileObject = {
            gender:doc.gender,
            major:doc.major,
            aboutMe:doc.aboutMe,
            picturePath:doc.picturePath
          };
        }

        //Pass data to prepopulate form
        res.render('profileStudentEdit',{userInfo:userObject, profileInfo:sProfileObject});

      });



    }else{

      var tProfileObject = {};
      teacherProfileModel.findOne({ 'username': username }, function (err, doc){

        if(doc){
          tProfileObject = {
            gender:doc.gender,
            department:doc.department,
            office:doc.office,
            officeHours:doc.officeHours,
            aboutMe:doc.aboutMe,
            picturePath:doc.picturePath
          };
        }

        //Pass data to prepopulate form
        res.render('profileTeacherEdit',{userInfo:userObject, profileInfo:tProfileObject});
      });
    }

  }else{
    res.send('ERROR: YOUR EDIT PROFILE PAGE CANNOT BE FOUND');
  }


});
});

app.get('/profiles/:username',appObj.checkAuthentication,function(req,res){

  var username = req.params.username;

  userModel.findOne({'local.username':username},function(error,user){

    if(error){
      res.send('AN ERROR OCCURED');
    }

    if(user){

      var userObject = {
        userName: user.local.username,
        firstName: user.local.firstname,
        lastName: user.local.lastname,
        email: user.local.email,
        idNumber:user.local.idNumber
      };

      if(user.local.accounttype =='student'){

        var sProfileObject = {};
        studentProfileModel.findOne({ 'username': username }, function (err, doc){

          if (doc) {
            sProfileObject = {
              gender:doc.gender,
              major:doc.major,
              aboutMe:doc.aboutMe,
              picturePath:doc.picturePath
            };
          }

        res.render('profileStudent',{userInfo:userObject, profileInfo:sProfileObject});
        });
    }else{

        var tProfileObject={};
            teacherProfileModel.findOne({ 'username': username }, function (err, doc){

              if(doc){
                tProfileObject={
                  gender:doc.gender,
                  department:doc.department,
                  office:doc.office,
                  officeHours:doc.officeHours,
                  aboutMe:doc.aboutMe,
                  picturePath:doc.picturePath
                };
              }

              res.render('profileTeacher',{userInfo:userObject,profileInfo:tProfileObject});
            });
    }
  }else{
      res.send('NO SUCH PROFILE');
    }

    });


  });


/* ================END OF PROFILE==================== */


} //End of runApp


};// End of appObj


module.exports = appObj;
