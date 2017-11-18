var contentId = Number.parseInt(getQueryParameterByName("id"));
if (contentId == null || isNaN(contentId) || contentId >= contents.length || contentId < 0){
	alert('Invalid content id');
	window.location = '../dashboard.html';
}

$(document).ready(function() {
	//TODO REMOVE
	console.log('//TODO Like/Dislike Review; Recommend show;');

	populateInfo();
	if (contents[contentId].isShow){
		populateSeasons();
		$('#episodes').show();
	}
	populateActors();
	populateReviews("best");
});

function populateInfo(){
	//Poster
	var poster = $("#showPoster")[0];
	poster.children[0].src = contents[contentId].poster;
	if (contents[contentId].isShow){
		poster.onclick = function(){ window.location = '../player.html?contentId='+contentId+'&season=1&episode=1'; };
	} else {
		poster.onclick = function(){ window.location = '../player.html?contentId='+contentId; };
	}

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

	//Lists
	var listsList = document.getElementById("listsList");
	var count = 0;
	for (var i = 0; i < users[0].lists.length; i++){
		var listContainsContent = $.inArray(contentId, users[0].lists[i].contents) > -1;
		if (listContainsContent){
			count++;
		}

		var listEntry = document.createElement("div");
		listEntry.className = "dropdownEntry";
		var str = ""+i;
		listEntry.onclick = function(){ toggleAddToList(this.children); };
			var contains = document.createElement("input");
			contains.type = "hidden";
			contains.name = "contains";
			if (listContainsContent){
				contains.value = "1";
			} else {
				contains.value = "0";
			}
			listEntry.appendChild(contains);
			var list = document.createElement("input");
			list.type = "hidden";
			list.name = "list";
			list.value = i;
			listEntry.appendChild(list);
			var title = document.createElement("span");
			title.innerHTML = users[0].lists[i].title;
			listEntry.appendChild(title);
			var icon = document.createElement("i");
			icon.className = "material-icons";
			if (listContainsContent){
				icon.innerHTML = "playlist_add_check";
			} else {
				icon.innerHTML = "playlist_add";
			}
			listEntry.appendChild(icon);
		listsList.appendChild(listEntry);
	}
	document.getElementById("addToListCount").value = count;
	updateAddToListButton(count);

	//Synopsis
	document.getElementById('synopsis').innerHTML = contents[contentId].synopsis;

	//Rating
	document.getElementById('contentRating').innerHTML = getRatingStarString(contents[contentId].rating);
}

function populateSeasons(){
	var seasonsList = document.getElementById("seasonsList");
	for (var i = 1; i <= contents[contentId].seasons.length; i++){
		var season = document.createElement("a");
		season.href = "javascript:void(0)";
		season.onclick = function(){ populateEpisodes(this.innerHTML); };
		season.id = "seasonSelector"+i;
		if (i == 1){
			season.className = "seasonSelector selected";
		} else {
			season.className = "seasonSelector";
		}		
		season.innerHTML = i;
		seasonsList.appendChild(season);
	}
	populateEpisodes(1);
}

function populateEpisodes(season){
	console.log("Populating episodes for season: "+season);

	//Update selector
	var selected = document.getElementById("selectedSeason");
	document.getElementById("seasonSelector"+selected.value).className = "seasonSelector";
	document.getElementById("seasonSelector"+season).className = "seasonSelector selected";
	selected.value = season;

	var episodesList = document.getElementById("episodesList");
	
	episodesList.innerHTML = "";

	for (var i = 0; i < contents[contentId].seasons[season-1].episodes.length; i++){
		var episode = document.createElement("div");
		episode.className = "content";
		episode.value = "season="+season+"&episode="+(i+1);
		episode.onclick = function(){ window.location = '../player.html?contentId='+contentId+'&'+this.value; };
			var thumbnail = document.createElement("img");
			thumbnail.className = "thumbnail";
			thumbnail.src = contents[contentId].seasons[season-1].episodes[i].thumbnail;
			episode.appendChild(thumbnail);
			var thumbGradient = document.createElement("div");
			thumbGradient.className = "gradient";
			episode.appendChild(thumbGradient);
			var title = document.createElement("div");
			title.className = "title";
				var b = document.createElement("b");
				b.innerHTML = getEpisodeSeasonStr(season,i+1);
				title.appendChild(b);
				var span = document.createElement("span");
				span.innerHTML = contents[contentId].seasons[season-1].episodes[i].title;
				title.appendChild(span);
			episode.appendChild(title);
			var playContainer = document.createElement("div");
			playContainer.className = "playContainer";
			playContainer.title = 'Watch '+getEpisodeSeasonStr(season,i+1)+' - '+contents[contentId].seasons[season-1].episodes[i].title;
				var playGradient = document.createElement("div");
				playGradient.className = "gradient";
				playContainer.appendChild(playGradient);
				var play = document.createElement("div");
				play.className = "play";
				playContainer.appendChild(play);
			episode.appendChild(playContainer);
		episodesList.appendChild(episode);
	}
}

function populateActors(){
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

function populateReviews(sort){
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
	if (Number.parseInt(document.getElementById("reviewRating").value) == 0 || document.getElementById("reviewRating").value == "" || document.getElementById("reviewText").value == ""){
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
	newReview.rating = Number.parseInt(document.getElementById("reviewRating").value);
	newReview.date = getCurrentDateTime();
	newReview.text = document.getElementById("reviewText").value;
	newReview.likes = 1;
	newReview.dislikes = 0;

	if (!validateReview(true)){
		return;
	}

	document.getElementById("postReview").disabled = true;
	document.getElementById("cancelReview").disabled = true;

	contents[contentId].reviews.push(newReview);
	
	console.log('Saving to localStorage...');
	saveContents();

	showSnackbar("Thanks for your review of <b>"+contents[contentId].title+"</b>!");

	setTimeout(location.reload.bind(location), 2500);
}

function toggleAddToList(dropdownEntry){
	var list = users[0].lists[Number.parseInt(dropdownEntry[1].value)];
	count = Number.parseInt(document.getElementById("addToListCount").value);
	if (dropdownEntry[0].value == "1") {
		//Remove from list
		list.contents.splice( $.inArray(contentId, list.contents), 1 );

		showSnackbar("\""+contents[contentId].title+"\" was removed from \""+list.title+"\"");
		dropdownEntry[0].value = "0";
		dropdownEntry[3].innerHTML = "playlist_add";

		count--;
	} else {
		//Add to list
		list.contents.push(contentId);

		showSnackbar("\""+contents[contentId].title+"\" was added to \""+list.title+"\"");
		dropdownEntry[0].value = "1";
		dropdownEntry[3].innerHTML = "playlist_add_check";

		count++;
	}
	document.getElementById("addToListCount").value = count;

	console.log('Saving to localStorage...');
	saveUsers();

	updateAddToListButton(count);
}

function updateAddToListButton(count){
	if (count > 1) {
		document.getElementById("addToListBtn").innerHTML = "Listed on "+count+" lists";
	} else if (count == 1) {
		document.getElementById("addToListBtn").innerHTML = "Listed on "+count+" list";
	} else {
		document.getElementById("addToListBtn").innerHTML = "Add to a list";
	}
}