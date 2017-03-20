var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */
// Defines the root route. router.get receives a path and a function
// The req object represents the HTTP request and contains
// the query string, parameters, body, header
// The res object is the response Express sends when it receives
// a request
// render says to use the views/index.jade file for the layout
// and to set the value for title to 'Express'
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/thelist', function(req, res){

  // Get a Mongo client to work with the Mongo server
  var MongoClient = mongodb.MongoClient;

  // Define where the MongoDB server is
  var url = 'mongodb://localhost:27017/sampsite';

  // Connect to the server
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the Server', err);
  } else {
    // We are connected
    console.log('Connection established to', url);

    // Get the documents collection
    var collection = db.collection('students');

    // Find all students
    collection.find({}).toArray(function (err, result) {
      if (err) {
        res.send(err);
      } else if (result.length) {
        res.render('studentlist',{

          // Pass the returned database documents to Jade
          "studentlist" : result
        });
      } else {
        res.send('No documents found');
      }
      //Close connection
      db.close();
    });
  }
  });
});

// Route to the page we can add students from using newstudent.jade
router.get('/newstudent', function(req, res){
    res.render('newstudent', {title: 'Add Student' });
});

router.post('/addstudent', function(req, res){

    // Get a Mongo client to work with the Mongo server
    var MongoClient = mongodb.MongoClient;

    // Define where the MongoDB server is
    var url = 'mongodb://localhost:27017/sampsite';

    // Connect to the server
    MongoClient.connect(url, function(err, db){
      if (err) {
        console.log('Unable to connect to the Server:', err);
      } else {
        console.log('Connected to Server');

        // Get the documents collection
        var collection = db.collection('students');

        // Get the student data passed from the form
        var student1 = {student: req.body.student, street: req.body.street,
          city: req.body.city, state: req.body.state, sex: req.body.sex,
          gpa: req.body.gpa};

        // Insert the student data into the database
        collection.insert([student1], function (err, result){
          if (err) {
            console.log(err);
          } else {

            // Redirect to the updated student list
            res.redirect("thelist");
          }

          // Close the database
          db.close();
        });

      }
    });

  });

module.exports = router;