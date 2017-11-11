function showNotifs() {
    $("#notif_popup").toggleClass("showpopup");
    $("#user_popup").removeClass("showpopup");
}

function showDefs() {
    $("#user_popup").toggleClass("showpopup");
    $("#notif_popup").removeClass("showpopup");
}

//Credit: https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript/901144#901144
function getQueryParameterByName(name, url) {
	if (!url) {
		url = window.location.href;
	}
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex
			.exec(url);
	if (!results)
		return null;
	if (!results[2])
		return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
};

$(document).ready(function() {
	//Smooth scrolling to anchor
	$('a[href^="#"]').click(function() {
		var target = $(this.hash);
		if (target.length == 0) target = $('a[name="' + this.hash.substr(1) + '"]');
		if (target.length == 0) target = $('html');
		$('html, body').animate({ scrollTop: target.offset().top-100 }, 1000);
		return false;
	});
});

function getRatingStarString(rating) {
	var ratingsString = "";
	var intPart = Math.floor(rating);
	var remaining = 5;
	for (i = 0; i < intPart; i++){
		ratingsString += '<i class="material-icons">star</i>';
		remaining--;
	}
	if (rating - intPart >= 0.5){
		ratingsString += '<i class="material-icons">star_half</i>';
		remaining--;
	}
	for (i = 0; i < remaining; i++){
		ratingsString += '<i class="material-icons">star_border</i>';
	}
	return ratingsString;
}

function getCurrentDateTime(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var HH = today.getHours();
	var MM = today.getMinutes();

	var yyyy = today.getFullYear();
	if(dd<10){
		dd='0'+dd;
	} 
	if(mm<10){
		mm='0'+mm;
	}
	if(HH<10){
		HH='0'+HH;
	}
	if(MM<10){
		MM='0'+MM;
	}
	return yyyy+'-'+mm+'-'+dd+' '+HH+':'+MM;
}

function getEpisodeSeasonStr(season, episode){
	var connector;
	if (episode < 10){
		connector = "x0";
	} else {
		connector = "x";
	}
	return season + connector + episode;
}

//Credit: https://www.w3schools.com/howto/howto_js_snackbar.asp
function showSnackbar(htmlMessage) {
	console.log("[Snackbar] "+htmlMessage);

	// Get the snackbar DIV
	var x = document.getElementById("snackbar")

	// Add the "show" class to DIV
	x.className = "show";

	x.innerHTML = htmlMessage;

	// After 3 seconds, remove the show class from DIV
	setTimeout(function() {
		x.className = x.className.replace("show", "");
	}, 3000);
};