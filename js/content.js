var contentId = Number.parseInt(getQueryParameterByName("id"));
if (isNaN(contentId) || contentId > contents.length || contentId < 0){
	alert('Invalid content id');
	window.location = '../dashboard.html';
}

$(document).ready(function() {
	//TODO REMOVE
	console.log('//TODO Use fake db to populate data (whether show or movie); Add to list; Add Review; Like/Dislike Review');

	console.log("Populating data");
	populateInfo();
	if (contents[contentId].isShow){
		populateEpisodes(1);
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
	var ratingsString = getRatingStarString(contents[contentId].rating);
	document.getElementById('contentRating').innerHTML = ratingsString;
}

function populateEpisodes(season){
	console.log("Populating episodes for season "+season);
	console.log("TODO");
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
	console.log("TODO");
}

function goToCommunity(){
	window.location = './community.html?id='+contentId;
}