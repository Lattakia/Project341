$(document).ready(function(){

$(".integer").numeric();

$("#buttons").on("click", "#SaveButton", function(){
	
	
});


});

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
