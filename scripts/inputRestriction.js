$(document).ready(function(){

$(".integer").numeric(false, function() { alert("Integers only"); this.value = ""; this.focus(); });

$("#buttons").on("click", "#SaveButton", function(){
	
    
	var emailText = $("#email").val();
	
	if( !isEmail(emailText)  ){
		
			alert("Invalid Email");
	}else{
		//SAVE TO DATABASE
		alert("TO DO: Now save to database and refresh page");
	}
	
	
	
});


});

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}