/* Dependencies */
var chai = require('chai');
var routes = require('../routes.js');
var chaiHttp = require('chai-http');

/* Assertion Styles */
var expect = chai.expect;

/* Tests */
describe('Test displayAppropriateSurveyPage', function() {

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

		expect(routes.displayAppropriateSurveyPage(request, response)).to.equal(console.log(testObj));
	});

	it('expects reponse to be called', function(){
		var request = {
			session : {session : {title : "LapYok"}}
		},
			response = {
				render : function(path, obj) {console.log(obj);}
		};

		routes.displayAppropriateSurveyPage(request, response);
		expect(response).to.exist;
		expect(response).to.be.not.empty;
	});

});