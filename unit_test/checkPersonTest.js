/* Dependencies */
var chai = require('chai');
var sinon = require('sinon');
var routes = require('../routes.js');

/* Assertion Styles */
var assert = chai.assert;
var expect = chai.expect;

/* Specifying function variable */

/* Tests */
describe('Test', function() {
	it('should be successful', function(){
		var value = 0;
		expect(value).to.equal(0);
	});

	it('expects rendering same teacher name based on username', function(){
		var request = {
			session : {session : {title : "Chasiwpaw"}}
		},
			response = {
				render : function(path, obj) {console.log(obj);}
		},
			testObj = {
				teacherName: 'Andrew Feng'
		};

		expect(routes.checkPerson(request, response)).to.equal(console.log(testObj));
	});

	it('expects reponse to be called', function(){
		var request = {
			session : {session : {title : "LapYok"}}
		},
			response = {
				render : function(path, obj) {console.log(obj);}
		};

		routes.checkPerson(request, response);
		expect(response).to.exist;
		expect(response).to.be.not.empty;
	});

});