$(document).ready(function(){

$("#EditButton").click(function(){
	$("#form input").prop('disabled', false);
	
	var saveButtonHtml='<input type="submit" id="SaveButton" value="Save">';
	
	$("#buttons").empty().append(saveButtonHtml);
});

});