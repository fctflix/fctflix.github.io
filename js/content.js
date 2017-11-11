var contentId = Number.parseInt(getQueryParameterByName("id"));
if (isNaN(contentId) || contentId > contents.length || contentId < 0){
	alert('Invalid content id');
	window.location = '../dashboard.html';
}

$(document).ready(function() {
	//TODO REMOVE
	console.log('//TODO Episodes; Add to list; Like/Dislike Review;');

	populateInfo();
	if (contents[contentId].isShow){
		populateSeasons();
		$('#episodes').show();
	}
	populateActors();
	populateReviews();
});

function populateInfo(){
	console.log("Populating info");

	//Poster
	document.getElementById('showPoster').src = contents[contentId].poster;

	//Title
	document.getElementById('contentTitle').innerHTML = contents[contentId].title;

	//Info
	var infoDetails = document.getElementById('infoDetails');
	if (contents[contentId].isShow){
		var airs_bold = document.createElement("b");
		airs_bold.innerHTML = "Airs: ";
		infoDetails.appendChild(airs_bold);
		var airs_span = document.createElement("span");
		airs_span.innerHTML = contents[contentId].airs;
		infoDetails.appendChild(airs_span);
		var spacer = document.createElement("span");
		spacer.className = "spacer";
		infoDetails.appendChild(spacer);

		var network_bold = document.createElement("b");
		network_bold.innerHTML = "Network: ";
		infoDetails.appendChild(network_bold);
		var network_span = document.createElement("span");
		network_span.innerHTML = contents[contentId].network;
		infoDetails.appendChild(network_span);
		var spacer = document.createElement("span");
		spacer.className = "spacer";
		infoDetails.appendChild(spacer);
	} else {
		var released_bold = document.createElement("b");
		released_bold.innerHTML = "Released: ";
		infoDetails.appendChild(released_bold);
		var released_span = document.createElement("span");
		released_span.innerHTML = contents[contentId].released;
		infoDetails.appendChild(released_span);
		var spacer = document.createElement("span");
		spacer.className = "spacer";
		infoDetails.appendChild(spacer);
	}	
	var language_bold = document.createElement("b");
	language_bold.innerHTML = "Language: ";
	infoDetails.appendChild(language_bold);
	var language_span = document.createElement("span");
	language_span.innerHTML = contents[contentId].language;
	infoDetails.appendChild(language_span);
	var spacer = document.createElement("span");
	spacer.className = "spacer";
	infoDetails.appendChild(spacer);

	var genres_bold = document.createElement("b");
	genres_bold.innerHTML = "Genres: ";
	infoDetails.appendChild(genres_bold);
	var genresString = "";
	for (i = 0; i < contents[contentId].genres.length; i++){
		if (genresString.length > 0){
			genresString += ", ";
		}
		genresString += contents[contentId].genres[i];
	}
	var genres_span = document.createElement("span");
	genres_span.innerHTML = genresString;
	infoDetails.appendChild(genres_span);
	var spacer = document.createElement("span");
	spacer.className = "spacer";
	infoDetails.appendChild(spacer);
	
	//Synopsis
	document.getElementById('synopsis').innerHTML = contents[contentId].synopsis;

	//Rating
	document.getElementById('contentRating').innerHTML = getRatingStarString(contents[contentId].rating);
}

function populateSeasons(){
	console.log("Populating seasons");
	populateEpisodes(1);
}

function populateEpisodes(season){
	console.log("Populating episodes for season "+season);
	console.log("TODO populateEpisodes(season)");
}

function populateActors(){
	console.log("Populating actors");

	var actorsList = document.getElementById('actorsList');
	for (i = 0; i < contents[contentId].actors.length; i++){
		var actor = document.createElement("div");
		actor.className = "actor";
			var a = document.createElement("a");
			a.href = contents[contentId].actors[i].imdb;
				var img = document.createElement("img");
				img.src = contents[contentId].actors[i].photo;
				a.appendChild(img);
				var info = document.createElement("div");
				info.className = "info";
					var name = document.createElement("p");
					name.className = "name";
					name.title = contents[contentId].actors[i].name;
					name.innerHTML = contents[contentId].actors[i].name;
					info.appendChild(name);
					var character = document.createElement("p");
					character.className = "character";
					character.title = contents[contentId].actors[i].character;
					character.innerHTML = contents[contentId].actors[i].character;
					info.appendChild(character);
				a.appendChild(info);
			actor.appendChild(a);
		actorsList.appendChild(actor);
	}
}

function populateReviews(){
	console.log("Populating reviews");
	populateReviewsSorted("best");
}

function populateReviewsSorted(sort){
	console.log("Populating reviews using sort: "+sort);

	var reviewsList = document.getElementById('reviewsList');

	if (contents[contentId].reviews.length == 0){
		//No reviews :(
		var review = document.createElement("div");
		review.className = "review";
			var info = document.createElement("div");
			info.className = "info";
				var rating = document.createElement("span");
				rating.className = "rating";
				rating.innerHTML = getRatingStarString(0);
				info.appendChild(rating);
				var avatar = document.createElement("img");
				avatar.className = "avatar";
				avatar.src = "/images/logo.png";
				info.appendChild(avatar);
				var span = document.createElement("span");
					var name = document.createElement("div");
					name.innerHTML = "FCTFlix";
					span.appendChild(name);
					var date = document.createElement("div");
					date.innerHTML = getCurrentDateTime();
					span.appendChild(date);
				info.appendChild(span);
			review.appendChild(info);
			var text = document.createElement("p");
			text.innerHTML = "There aren't any reviews yet. :(";
			review.appendChild(text);
		reviewsList.appendChild(review);
	} else {
		//There are reviews. Sort and display
		sortedReviews = sortReviews(contents[contentId].reviews, sort);
		
		reviewsList.innerHTML = "";

		for (var i = 0; i < sortedReviews.length; i++){
			var review = document.createElement("div");
			review.className = "review";
				var info = document.createElement("div");
				info.className = "info";
					var rating = document.createElement("span");
					rating.className = "rating";
					rating.innerHTML = getRatingStarString(sortedReviews[i].rating);
					info.appendChild(rating);
					var avatar = document.createElement("img");
					avatar.className = "avatar";
					avatar.src = users[sortedReviews[i].user].avatar;
					info.appendChild(avatar);
					var span = document.createElement("span");
						var name = document.createElement("div");
						name.innerHTML = users[sortedReviews[i].user].name;
						span.appendChild(name);
						var date = document.createElement("div");
						date.innerHTML = sortedReviews[i].date;
						span.appendChild(date);
					info.appendChild(span);
				review.appendChild(info);
				var text = document.createElement("p");
				text.innerHTML = sortedReviews[i].text;
				review.appendChild(text);
				var div = document.createElement("div");
				div.className = "score";
					var span = document.createElement("span");
					span.innerHTML = "Was this review helpful?";
					div.appendChild(span);
					var spacer1 = document.createElement("span");
					spacer1.className = "spacer";
					div.appendChild(spacer1);
					var up = document.createElement("i");
					up.className = "material-icons";
					up.onclick = function(){alert('this does not work yet :(');};
					up.innerHTML = "thumb_up";
					div.appendChild(up);
					var spacer2 = document.createElement("span");
					spacer2.className = "spacer";
					div.appendChild(spacer2);
					var down = document.createElement("i");
					down.className = "material-icons";
					down.onclick = function(){alert('this does not work yet :(');};
					down.innerHTML = "thumb_down";
					div.appendChild(down);
					var average = document.createElement("span");
					average.className = "average";
					var likes = sortedReviews[i].likes;
					var dislikes = sortedReviews[i].dislikes;
					average.innerHTML = ((likes/(likes+dislikes))*100)+"% found this helpful";
					div.appendChild(average);
				review.appendChild(div);
			reviewsList.appendChild(review);
		}
	}	
}

function sortReviews(reviews, sort){
	switch (sort){
		case "highest":
			return reviews.sort(function(a,b){
				return b.rating - a.rating;
			});
			break;
		case "lowest":
			return reviews.sort(function(a,b){
				return a.rating - b.rating;
			});
			break;
		case "recent":
			return reviews.sort(function(a,b){
				if (a.date < b.date){
					return 1;
				} else if (a.date > b.date){
					return -1;
				} else {
					return 0;
				}
			});
			break;
		case "best":
		default:
			return reviews.sort(function(a,b){
				var scoreA = a.likes/(a.likes+a.dislikes);
				var scoreB = b.likes/(b.likes+b.dislikes);
				return scoreB - scoreA;
			});
			break;
	}
}

function goToCommunity(){
	window.location = './community.html?id='+contentId;
}

function rate(newRating){
	document.getElementById("reviewRating").value = newRating;
	switch (newRating) {
		case 1:
			document.getElementById("reviewModalStar1").innerHTML = "star";
			document.getElementById("reviewModalStar2").innerHTML = "star_border";
			document.getElementById("reviewModalStar3").innerHTML = "star_border";
			document.getElementById("reviewModalStar4").innerHTML = "star_border";
			document.getElementById("reviewModalStar5").innerHTML = "star_border";
			break;
		case 2:
			document.getElementById("reviewModalStar1").innerHTML = "star";
			document.getElementById("reviewModalStar2").innerHTML = "star";
			document.getElementById("reviewModalStar3").innerHTML = "star_border";
			document.getElementById("reviewModalStar4").innerHTML = "star_border";
			document.getElementById("reviewModalStar5").innerHTML = "star_border";
			break;
		case 3:
			document.getElementById("reviewModalStar1").innerHTML = "star";
			document.getElementById("reviewModalStar2").innerHTML = "star";
			document.getElementById("reviewModalStar3").innerHTML = "star";
			document.getElementById("reviewModalStar4").innerHTML = "star_border";
			document.getElementById("reviewModalStar5").innerHTML = "star_border";
			break;
		case 4:
			document.getElementById("reviewModalStar1").innerHTML = "star";
			document.getElementById("reviewModalStar2").innerHTML = "star";
			document.getElementById("reviewModalStar3").innerHTML = "star";
			document.getElementById("reviewModalStar4").innerHTML = "star";
			document.getElementById("reviewModalStar5").innerHTML = "star_border";
			break;
		case 5:
			document.getElementById("reviewModalStar1").innerHTML = "star";
			document.getElementById("reviewModalStar2").innerHTML = "star";
			document.getElementById("reviewModalStar3").innerHTML = "star";
			document.getElementById("reviewModalStar4").innerHTML = "star";
			document.getElementById("reviewModalStar5").innerHTML = "star";
			break;
		case 0:
		default:
			document.getElementById("reviewModalStar1").innerHTML = "star_border";
			document.getElementById("reviewModalStar2").innerHTML = "star_border";
			document.getElementById("reviewModalStar3").innerHTML = "star_border";
			document.getElementById("reviewModalStar4").innerHTML = "star_border";
			document.getElementById("reviewModalStar5").innerHTML = "star_border";
			break;

	}

	validateReview(false);
}

function validateReview(showAlert){
	if (document.getElementById("reviewRating").value == 0 || document.getElementById("reviewText").value == ""){
		document.getElementById("postReview").disabled = true;
		if (showAlert){
			alert("Make sure you've rated and typed your review");
		}
		return false;
	} else {
		document.getElementById("postReview").disabled = false;
		return true;
	}
}

function addReview(){
	var newReview = {};
	newReview.user = 0;
	newReview.rating = document.getElementById("reviewRating").value;
	newReview.date = getCurrentDateTime();
	newReview.text = document.getElementById("reviewText").value;
	newReview.likes = 1;
	newReview.dislikes = 0;

	if (!validateReview(true)){
		return;
	}

	contents[contentId].reviews.push(newReview);
	saveContents();

	showSnackbar("Thanks for your review of \""+contents[contentId].title+"\"!");

	setTimeout(location.reload.bind(location), 2500);
}