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

	//Search when enter is hit
	$("#searchbar").on('keyup', function (e) {
		if (e.keyCode == 13) {
	        search();
	    }
	});

	getNotifications();
	getUserDefs();
});

function getNotifications() {
	//uhh we should check who is logged in instead of using zero but ok
	var notifs = users[0].notifications
	if(!notifs) notifs = [] //safety measure
	$("#new_notifs").html(notifs.length)
	if(notifs.length <= 0) {
		$("#notif_popup").html("You have no new notifications.")
	} else {
		$("#notif_popup").html("")
		for(var i = 0; i < notifs.length; i++) {
			var n = notifs[i]
			if(n.type == "new_episode") {
				var item = document.createElement("div")
				item.className = "notif-item"
				var img = document.createElement("img")
				img.className = "notif-img"
				img.src = contents[n.showId].poster
				item.appendChild(img)
				var text = document.createElement("div")
				text.className = "notif-text"
				text.innerHTML = "A new episode of <u>"+contents[n.showId].title+"</u> has just come out. You should check it out!"
				item.appendChild(text)
				$("#notif_popup").append(item)
			} else if(n.type == "post_reply") {
				var item = document.createElement("div")
				item.className = "notif-item"
				var img = document.createElement("img")
				img.className = "notif-img"
				img.src = contents[n.showId].poster
				item.appendChild(img)
				var text = document.createElement("div")
				text.className = "notif-text"
				text.innerHTML = "Someone commented on your post <b>"+contents[n.showId].posts[n.postId].title+"</b> on <u>"+contents[n.showId].title+"</u>'s community."
				item.appendChild(text)
				$("#notif_popup").append(item)
			}
			if(i < notifs.length - 1) {
				var spacer = document.createElement("div")
				spacer.className = "spacer"
				$("#notif_popup").append(spacer)
			}
		}
	}
}

function getUserDefs() {
	//uhh we should check who is logged in instead of using zero but ok
	var user = users[0]
	$("#username").html(user.name+"!")
}

function changeAvatar() {
	premiumAlert();
}

function logOut() {
	premiumAlert();
}

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

function search(){
	var query = document.getElementById("searchbar").value.trim();
	if (window.location.pathname !== "/search.html"){
		if (query.length > 0){
			window.location = "/search.html?q="+encodeURIComponent(query);
		} else {
			window.location = "/search.html";
		}
	} else {
		filter();
	}
}

function urlifyPost(text) {
	text = text.replace(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/, '<div class="videoContainer"><iframe class="video" src="https://www.youtube.com/embed/$2" frameborder="0" allowfullscreen></iframe></div>');
	return text.replace(/(https?:\/\/[^\s]+(.jpg|.jpeg|.png|.gif|.webp|.bmp|.svg))/g, '<img class="post-image" src="$1"/>');
}

function calculateTimeDifference(date) {
	var millis = Date.now() - Date.parse(date)
	millis /= 1000
	//less than 1 minute
	if(millis <= 0) return "now";
	if(millis < 60) return Math.floor(millis)+"s"
	//less than 1 hour
	if(millis < 60*60) return Math.floor(millis/60)+"m"
	//less than 1 day
	if(millis < 60*60*24) return Math.floor(millis/60/60)+"h"
	if(millis < 60*60*24*365) return Math.floor(millis/60/60/24)+"d"
	return "null" //safety measure
}

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function premiumAlert(){
	alert("This feature requires FCTFlix Premium. (Only 30€/month)");
	alert("☝️ The intent ☝️ is to provide 👉👨 users with a sense of 💪 pride 💪 and 🏆accomplishment 🏆 for 🔓 unlocking 🔓 different features");
	alert("As for 💰 cost 💰 , we selected initial values based upon 📊 data 📊 from the Open Beta and other 🔧 adjustments 🔧 made to milestone 💰 rewards 💰 before 🚀 launch 🚀. Among other things, we're 👀 looking 👀 at ⚖️ average ⚖️ per-user 👨 👩 credit 💸 earn rates 📈 on a daily basis 📅, and we'll be making constant adjustments 🔧 to ensure that users 👨👨 have challenges 😤 that are compelling 😍, rewarding 💰, and of course attainable 🏆 via gameplay 🎮");
	alert("We appreciate the candid 👀 feedback, and the passion 😡 the community 👨 👨 👨 has put forth around the current topics here on Reddit💻, our forums 🌐 and across 🌐 numerous 🌐 social media outlets 🌐");
	alert("Our team 👨👨👨👨👨 will continue to make 🔧 changes 🔧 and monitor 👀 community feedback and update everyone as soon 📅 and as 📅 often 📅 as we can. 👍");
	alert("JK. We just haven't implemented this");
}