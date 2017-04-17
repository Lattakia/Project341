/* Dependencies */
var chai = require('chai');
//var sinon = require('sinon');
var routes = require('../routes.js');
var chaiHttp = require('chai-http');

/* Assertion Styles */
var assert = chai.assert;
var expect = chai.expect;
chai.use(chaiHttp);
var should = chai.should();

describe('Test', function() {
	it('should be successful', function(){
		var value = 0;
		expect(value).to.equal(0);
	});

	it('should call next() if the authentication succeeds', function(){
		var request = {
			isAuthenticated: function(){return false;}
		},
			response = {},
			next = function(err) {
				console.log('hi')
			};

		request.user = "Andrew";
		response.redirect = function(path){
			console.log(path);
		}

		routes.checkAuthentication(request, response, next);
	});
});
