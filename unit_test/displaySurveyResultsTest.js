/* Dependencies */
var chai = require('chai');
var routes = require('../routes.js');
var chaiHttp = require('chai-http');

/* Assertion Styles */
var expect = chai.expect;

/* Tests */
describe('Test displaySurveyResults', function() {

	it('expects rendering survey results of a professor\'s survey.', function(){
		var request = {
			session : {session : {title : "ccProf"}},
			query: {
				radio1 : 'Q1',
				radio2 : 'Q2',
				radio3 : 'Q3',
				radio4 : 'Q4',
				radio5 : 'Q5',
				mylittletextbox : 'Comment'
			}
		},
			response = {
				render : function(path, obj) {console.log(obj);}
		},
			testObj = [{

          studentUserName: 'ccStudent',
          surveyMakerName : 'ccProf',
          updated: false,
          surveyResponses: {
	          question1: request.query.radio1,
	          question2: request.query.radio2, 
	          question3: request.query.radio3, 
	          question4: request.query.radio4, 
	          question5: request.query.radio5, 
	          comments: request.query.mylittletextbox
	      }

		}];

		expect(routes.displaySurveyResults(request, response)).to.equal(console.log(testObj));
	});

	it('expects response to be invalid for rendering the survey results page.', function(){
		var request = {
			session : {session : {title : "Nobody"}},
			query: {
				radio1 : 'Q1',
				radio2 : 'Q2',
				radio3 : 'Q3',
				radio4 : 'Q4',
				radio5 : 'Q5',
				mylittletextbox : 'Comment'
			}
		},
			response = {
				render : function(path, obj) {console.log(obj);}
		},
			testObj = [{

          studentUserName: 'ccStudent',
          surveyMakerName : 'ccProf',
          updated: false,
          surveyResponses: {
	          question1: request.query.radio1,
	          question2: request.query.radio2, 
	          question3: request.query.radio3, 
	          question4: request.query.radio4, 
	          question5: request.query.radio5, 
	          comments: request.query.mylittletextbox
	      }

		}];

		routes.displaySurveyResults(request, response);

		expect(response).to.not.exist;
	});

});