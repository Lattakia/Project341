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
				render : function(path, obj) {console.log(obj)}
		};

		expect(routes.checkPerson(request, response)).to.equal(console.log({teacherName: "Andrew Feng"}));
	});

});