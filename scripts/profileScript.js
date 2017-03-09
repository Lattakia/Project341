$(document).ready(function(){





$("#EditButton").click(function(){
	$("#profileInfo input").prop('disabled', false);
	$("#uploadPic").show();
	
	

	var saveButtonHtml='<input type="button" id="SaveButton" value="Save">';
	
	$("#buttons").empty().append(saveButtonHtml);
});







});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#profilePic').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}