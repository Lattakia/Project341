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

	it('should call next() if the authentication succeeds', function(){
		var request = {
			session : {session : {title : "Chasiwpaw"}}
		},
			response = {
				redirect : function(path) { console.log(path);}
		};

		routes.checkPerson(request, response);
	});

});