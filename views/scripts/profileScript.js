$(document).ready(function(){


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

function selectGender(gender){
	if(gender=="Male"){
		$("#genderDropDown").val("Male");
	}else if(gender=="Female"){
		$("#genderDropDown").val("Female");
	}
}
