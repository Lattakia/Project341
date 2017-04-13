/* Dependencies */
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var should = chai.should(); 
// var sinon = require('sinon');
var routes = require('../routes.js');

/* Assertion Styles */
var assert = chai.assert;
var expect = chai.expect;

/* Will be used to test database functionality */
var URLMain = 'mongodb://localhost:27017/main'
var URLSurvey = 'mongodb://localhost:27017/surveydatabase'
var URLMyDB = 'mongodb://localhost:27017/mydatabase'
var URLFaulty = 'mongodb://localhost:27017/troll'

/* Will be used as dummy database entries. */
var profTest = {
					local : {
						username : 'Prof_Test',
		 			    password : 'pt',
					    firstname : 'Prof', 
					    lastname : 'Test',
					    email : 'ptest@gmail.com',
					    idNumber : '123456789',
					    accounttype : 'teacherta'
					}
				   
			};

var studTest = {
					local : {
						username : 'Stud_Test',
		 			    password : 'pt',
					    firstname : 'Stud', 
					    lastname : 'Test',
					    email : 'stest@gmail.com',
					    idNumber : '123456789',
					    accounttype : 'student'
					}
				   
			};

var surveyResultsTest = {
	studentUserName: 'Stud_Test',
	surveyMakerName: 'Prof Test',
	updated: false,
	surveyResponses : {
		question1: 'StronglyAgree',
		question2: 'StronglyAgree',
		question3: 'StronglyAgree',
		question4: 'StronglyAgree',
		question5: 'StronglyAgree',
		comments: 'I liked this class.'
	}
};
/* Specifying function variable */

/* Tests */
describe('Test', function() {
	var server = require('../app.js')
	// afterEach('remove all dummy documents from databases.', function(done){
	// 	var MongoClient = require('mongodb').MongoClient;

	// 	MongoClient.connect(URLMain, function(err, db){
	// 		var collection = db.collection('users');
	// 		collection.remove(profTest);
	// 		collection.remove(studTest);
	// 		db.close();
	// 	});

	// 	MongoClient.connect(URLSurvey, function(err, db){
	// 		var collection = db.collection('survey_values');
	// 		collection.remove(surveyResultsTest);
	// 		db.close();
	// 	});

	// 	done();
	// })

	it('should be successful', function(){
		var value = 0;
		expect(value).to.equal(0);
	});

	// it('should call next() if the authentication succeeds', function(){
	// 	var request = {
	// 		isAuthenticated : function() {return true;}
	// 	},
	// 		response = {
	// 			redirect : function(path) { console.log(path);}
	// 	},
	// 		next = function(err) {
	// 			console.log('hi')
	// 	};

	// 	expect(routes.checkAuthentication(request, response, next)).to.equal(console.log('hi'));
	// });

	// it('should call next() if the authentication succeeds', function(){
	// 	var request = {
	// 		isAuthenticated : function() {return false;}
	// 	},
	// 		response = {
	// 			redirect : function(path) { console.log(path);}
	// 	},
	// 		next = function(err) {
	// 			console.log('hi')
	// 	};

	// 	expect(routes.checkAuthentication(request, response, next)).to.equal(console.log("/"));
	// });

	it('should not connect to any database', function(done){
		var MongoClient = require('mongodb').MongoClient
		MongoClient.connect(URLFaulty, function(err, db){
			assert(err != null);
		});
		done();
	});

	it('should connect to the main database', function(done){
		var MongoClient = require('mongodb').MongoClient
		MongoClient.connect(URLMain, function(err, db){
			assert.equal(null, err);
		});
		done();
	});

	it('should connect to the survey database', function(done){
		var MongoClient = require('mongodb').MongoClient
		MongoClient.connect(URLMain, function(err, db){
			assert.equal(null, err);
		});
		done();
	});

	it('should connect to mydatabase', function(done){
		var MongoClient = require('mongodb').MongoClient
		MongoClient.connect(URLMyDB, function(err, db){
			assert.equal(null, err);
		});
		done();
	});

	// it('should find the results of an existing set of survey results of a professor', function(done){
	// 	var MongoClient = require('mongodb').MongoClient
	// 	MongoClient.connect(URLMain, function(err, db){
	// 		var collection = db.collection('users');
	// 		collection.insert(profTest);
	// 	});

	// 	MongoClient.connect(URLSurvey, function(err, db){
	// 		var collection = db.collection('survey_values');
	// 		collection.insert(surveyResultsTest);
	// 	});

	// 	request = {
	// 		session : {
	// 			session : {
	// 				title : profTest['local']['username']
	// 			}
	// 		}
	// 	};

	// 	response = {
	// 			resObj : {},
	// 			render : function(file, obj) { console.log(file);}
	// 	};
		
	// 	expect(routes.displaySurveyResults(request, response)).to.equal(console.log('nuts'));
	// 	done();
	// });

	it('responds to /', function testSlash(done){
		chai.request(server)
	      .get('/')
	      .end(function(err, res){
	      	res.should.have.status(200);
	        done();
	      });
	});

	it('404 to this stuff', function testPath(done){
		chai.request(server)
	      .get('/foo/bar')
	      .end(function(err, res){
	      	res.should.have.status(404);
	        done();
	      });
	});


	it('Should go to main page.', function(done){
		chai.request(server)
	      .get('/main')
	      .end(function(err, res){
	      	res.should.have.status(200);
	        done();
	      });
	});

	it('Should go to login page and login as a student.', function(done){
		chai.request(server)
	      .get('/login')
	      .send({username : 'ccStudent', password : 'cc'})
	      .end(function(err, res){
	      	res.should.have.status(200);
	        done();
	      });
	});

	it('Should do a survey as a student.', function(done){
		chai.request(server)
	      .get('/surveys')
	      .send({username : 'ccStudent', password : 'cc'})
	      .get('surveys-students')
	      .send({teacher: 'Yan Liu'})
	      .end(function(err, res){
	      	res.should.have.status(200);
	        done();
	      });
	});
	
	// it('Should do a survey as a student.', function(done){
	// 	chai.request(server)
	//       	.get('/surveys-students')
	//       	.send({teacher: 'Yan Liu'})
	//       	.end(function(err, res){
	//       		res.should.have.status(200);
	//       		done();
	//       	});
	// 	});

});

