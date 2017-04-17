/* Dependencies */
var chai = require('chai');
var sinon = require('sinon');
var chaiHttp = require('chai-http');
var should = chai.should();
var enableDestroy = require('server-destroy');
var routes = require('../routes.js');

/* Assertion Styles */
var assert = chai.assert;
var expect = chai.expect;

chai.use(chaiHttp);
var should = chai.should();

/* Tests */
describe('Testing Connect Concordia', function() {
	var server = require('../app.js');
	enableDestroy(server);

	beforeEach('some description', function(){
		//delete require.cache[require.resolve('../app')];
		server = require('../app.js');
		enableDestroy(server);
	});

	afterEach(function(done){
		server.destroy(done);
	});

	it('responds to /', function (done){
		chai.request(server)
	      .get('/main')
	      .end(function(err, res){
	      	res.should.have.status(200);
	        done();
	      });
	});

	it('404 to this stuff', function (done){
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

	it('Should go to the login page and login as a student.', function(done){
		chai.request(server)
	      .get('/login', routes.login)
	      .send({username : 'ccStudent', password : 'cc'})
	      .end(function(err, res){
	      	res.should.have.status(200);
	        done();
	      });
	});

	it('Should go to sign up page (and sign up as a student).', function(done){
		chai.request(server)
	      .post('/submitted', routes.submittedSignUpInfo)
	      .end(function(err, res){
	      	res.should.have.status(200);
	        done();
	      });
	});

});