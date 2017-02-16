$(document).ready(function(){



$(".integer").numeric(false, function() { alert("Integers only"); this.value = ""; this.focus(); });


/*
$("#SaveButton").click(function(){

	//var numChar = $("#NewPass").text().length();
	alert("Your password is " +  numChar + " characters.");

});
*/

/*
$("#SaveButton").on( "click", function() {
	
	alert("Hi");
	//var numChar = $("#NewPass").text().length();
	//alert("Your password is " +  numChar + " characters.");
});
*/


$("#buttons").on("click", "#SaveButton", function(){
    
	var oldPassChar = $("#OldPass").val();
	var newPassChar = $("#NewPass").val();
	var newPassCChar = $("#NewPassC").val();
	var newMessage = "";
	if(newPassChar == oldPassChar){
		newMessage += "- New password is equal to the old password!\n";
	}
	if(newPassChar.length < 8){
		newMessage += "- Your password is only " +  newPassChar + " characters. Minimum is 8.\n";
	}
	if(newPassCChar != newPassChar){
		newMessage += "- Your confirm password is not equal to the new password.\n";
	}
	alert(newMessage);
});




});