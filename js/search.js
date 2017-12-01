var query, selectedGenres, year1, year2, rating;
var genres = ["Action", "Adventure", "Animation", "Comedy", "Drama", "Fantasy", "Horror", "SciFi"];

$(document).ready(function() {
	//Fill query
	query = getQueryParameterByName("q");
	if (query == null){
		query = "";
	}
	if (query.length > 0){
		query = query.trim();
		document.getElementById("searchbar").value = query;
		document.getElementById("queryOut").innerHTML = 'Search Results for "'+query+'"';
		document.getElementById("queryOut").style = "";
	}

	//Fill genres
	selectedGenres = getQueryParameterByName("g");
	if (selectedGenres == null){
		selectedGenres = genres.slice(0); //slice is here so we don't change the original list
	} else {
		selectedGenres = selectedGenres.split(',');
	}
	fillSelectedGenres();

	//Fill years
	year1 = getQueryParameterByName("y1");
	if (year1 == null){
		year1 = 1900;
	}
	document.getElementById("year1Filter").value = year1;
	year2 = getQueryParameterByName("y2");
	if (year2 == null){
		year2 = 2050;
	}
	document.getElementById("year2Filter").value = year2;

	//Fill rating
	rating = getQueryParameterByName("r");
	if (rating == null){
		rating = 0;
	} else {
		rating = Number.parseInt(rating);
	}
	filterRate(rating);

	//Search
	searchDb();
});

function fillSelectedGenres() {
	for (genre in selectedGenres){
		$('#select'+selectedGenres[genre])[0].innerHTML = "check_box";
	};

	updateSelectedGenresDropdown();
}

function toggleGenre(genre) {
	var selected = $.inArray(genre, selectedGenres);
	if (selected != -1) {
		//Remove from list
		selectedGenres.splice(selected, 1 );

		$('#select'+genre)[0].innerHTML = "check_box_outline_blank";
		console.log("No longer showing results for genre: "+genre);
	} else {	
		//Add to list
		selectedGenres.push(genre);

		$('#select'+genre)[0].innerHTML = "check_box";
		console.log("Now showing results for genre: "+genre);
	}

	updateSelectedGenresDropdown();
}

function updateSelectedGenresDropdown(){
	if (selectedGenres.length == genres.length){
		$('#genreBtn')[0].innerHTML = "All";
	} else if (selectedGenres.length == 0){
		$('#genreBtn')[0].innerHTML = "None";
	} else {
		$('#genreBtn')[0].innerHTML = selectedGenres.length+" selected";
	}
	
}

function filterRate(r) {
	rating = r;
	var rateStr = '';
	if (r == 0){
		rateStr = '<span style="font-size: 24px;vertical-align: middle;"></span></span>All Ratings</span>'; //empty span because of layout issues and I don't want to change the size of the text
	} else {
		for (var i = 1; i <= rating; i++){
			rateStr += '<i class="material-icons">star</i>';
		}		
	}

	document.getElementById("filterRating").innerHTML = rateStr;
}

//Doesn't actually search, just applies the filters. Yeah, I know I could do it better but fuck it.
function filter() {
	query = document.getElementById("searchbar").value.trim();
	year1 = document.getElementById("year1Filter").value;
	year2 = document.getElementById("year2Filter").value;

	if (selectedGenres.length == 0){
		selectedGenres = genres;
	}

	if (year1 > year2) {
		document.getElementById("year1Filter").value = year2;
		document.getElementById("year2Filter").value = year1;
		var tmp = year1;
		year1 = year2;
		year2 = tmp;
	}
	window.location = "./search.html?q="+encodeURIComponent(query)+"&g="+encodeURIComponent(selectedGenres)+"&y1="+encodeURIComponent(year1)+"&y2="+encodeURIComponent(year2)+"&r="+encodeURIComponent(rating);
}

function searchDb() {
	showSnackbar("Searching...");
	console.log("[Search] Query: \""+query+"\" | Genres: ["+selectedGenres+"] | Year range: ("+year1+"-"+year2+") | Rating: "+rating);

	var showsList = [];
	var moviesList = [];
	var listsList = [];
	var usersList = [];

	for (content in contents) {
		if (query.length > 0) {
			// Non-empty query			
			if (contents[content].title.toUpperCase().search(query.toUpperCase()) == -1){
				// Content title doesn't contain query
				continue;
			}
		}

		if (selectedGenres.length < genres.length) {
			// Genres are being filtered
			var selectedGenresIntersect = $.grep(selectedGenres, function(v,i) {
			    return $.inArray(v, contents[content].genres) !== -1;
			}).length === selectedGenres.length;
			if (!selectedGenresIntersect) {
				// Some or all selected genres are not in the content's genres
				continue;
			}
		}
		
		if (contents[content].year < year1 || contents[content].year > year2){
			// Content outside time range
			console.log(contents[content].title);
			continue;
		}

		if (rating != 0){
			// Rating is being filtered
			if (rating == 5 && contents[content].rating < 4.5){
				// We want 5 stars and rating is below 5 stars
				continue;
			} else if (rating == 4 && (contents[content].rating < 3.5 || contents[content].rating >= 4.5)){
				// We want 4 stars and rating is below or above 4 stars
				continue;
			} else if (rating == 3 && (contents[content].rating < 2.5 || contents[content].rating >= 3.5)){
				// We want 3 stars and rating is below or above 3 stars
				continue;
			} else if (rating == 2 && (contents[content].rating < 1.5 || contents[content].rating >= 2.5)){
				// We want 2 stars and rating is below or above 2 stars
				continue;
			} else if (rating == 1 && contents[content].rating >= 1.5){
				// We want 1 star and rating is above 1 star
				continue;
			}
		}

		if (contents[content].isShow){
			// Show
			showsList.push(content);
		} else {
			// Movie
			moviesList.push(content);
		}
	}

	var suggestShows = showsList.length == 0;
	var suggestMovies = moviesList.length == 0;

	if (suggestShows || suggestMovies){
		for (content in contents) {
			if (contents[content].isShow && !suggestShows){
				// Don't need to suggest shows
				continue;
			} else if (!contents[content].isShow && !suggestMovies){
				// Don't need to suggest movies
				continue;
			}

			if (selectedGenres.length < genres.length) {
				// Genres are being filtered
				var selectedGenresIntersect = $.grep(selectedGenres, function(v,i) {
				    return $.inArray(v, contents[content].genres) !== -1;
				}).length === selectedGenres.length;
				if (!selectedGenresIntersect) {
					// Some or all selected genres are not in the content's genres
					continue;
				}
			}
			
			if (contents[content].year < year1 || contents[content].year > year2){
				// Content outside time range
				continue;
			}

			if (rating != 0){
				// Rating is being filtered
				if (rating == 5 && contents[content].rating < 4.5){
					// We want 5 stars and rating is below 5 stars
					continue;
				} else if (rating == 4 && (contents[content].rating < 3.5 || contents[content].rating >= 4.5)){
					// We want 4 stars and rating is below or above 4 stars
					continue;
				} else if (rating == 3 && (contents[content].rating < 2.5 || contents[content].rating >= 3.5)){
					// We want 3 stars and rating is below or above 3 stars
					continue;
				} else if (rating == 2 && (contents[content].rating < 1.5 || contents[content].rating >= 2.5)){
					// We want 2 stars and rating is below or above 2 stars
					continue;
				} else if (rating == 1 && contents[content].rating >= 1.5){
					// We want 1 star and rating is above 1 star
					continue;
				}
			}

			if (contents[content].isShow){
				// Show
				showsList.push(content);
			} else {
				// Movie
				moviesList.push(content);
			}
		}
	}

	if (query.length > 0) {
		for (user in users) {
			if (users[user].name.toUpperCase().search(query.toUpperCase()) != -1 || users[user].name.toUpperCase().search(query.replace(/\s+/g, '_').toUpperCase()) != -1 || users[user].name.toUpperCase().search(query.replace(/\s+/g, '-').toUpperCase()) != -1 || users[user].name.toUpperCase().search(query.replace(/\s+/g, '').toUpperCase()) != -1){
				// User name contains query
				usersList.push(user);
			}

			for (list in users[user].lists) {
				if (users[user].lists[list].title.toUpperCase().search(query.toUpperCase()) != -1){
					// List title contains query
					listsList.push([Number.parseInt(user), Number.parseInt(list)]);
				}
			}
		}
	}

	fillShows(showsList, suggestShows);
	fillMovies(moviesList, suggestMovies);
	fillLists(listsList);
	fillUsers(usersList);
}

function fillShows(showsList, isSuggestions) {
	if (showsList.length == 0) {
		$('#noTVResults').show();
	} else if (isSuggestions) {
		$('#suggestTV').show();
	}

	var tvList = document.getElementById("tvList");
	for (entry in showsList){
		var show = document.createElement("div");
		show.className = "content";
		show.value = showsList[entry];
		show.onclick = function(){ window.location = './show/index.html?id='+this.value; };
			var thumbnail = document.createElement("img");
			thumbnail.className = "thumbnail";
			thumbnail.src = contents[showsList[entry]].thumbnail;
			show.appendChild(thumbnail);
			var ratingGradient = document.createElement("div");
			ratingGradient.className = "gradient-top";
			show.appendChild(ratingGradient);
			var ratingDiv = document.createElement("div");
			ratingDiv.className = "rating";
			if (isSuggestions) {
				ratingDiv.innerHTML = '<span class="suggested"><i class="material-icons">info</i> Suggested</span><span>'+contents[showsList[entry]].rating+'</span><i class="material-icons">star</i>';
			} else {
				ratingDiv.innerHTML = '<span>'+contents[showsList[entry]].rating+'</span><i class="material-icons">star</i>';
			}
			show.appendChild(ratingDiv);
			var thumbGradient = document.createElement("div");
			thumbGradient.className = "gradient";
			show.appendChild(thumbGradient);
			var title = document.createElement("div");
			title.className = "title";
				var span = document.createElement("span");
				span.innerHTML = contents[showsList[entry]].title;
				span.title = contents[showsList[entry]].title;
				title.appendChild(span);
			show.appendChild(title);
		tvList.appendChild(show);
	}
}

function fillMovies(moviesList, isSuggestions) {
	if (moviesList.length == 0) {
		$('#noMovieResults').show();
	} else if (isSuggestions) {
		$('#suggestMovie').show();
	}

	var movieList = document.getElementById("movieList");
	for (entry in moviesList){
		var movie = document.createElement("div");
		movie.className = "content";
		movie.value = moviesList[entry];
		movie.onclick = function(){ window.location = './show/index.html?id='+this.value; };
			var thumbnail = document.createElement("img");
			thumbnail.className = "thumbnail";
			thumbnail.src = contents[moviesList[entry]].thumbnail;
			movie.appendChild(thumbnail);
			var ratingGradient = document.createElement("div");
			ratingGradient.className = "gradient-top";
			movie.appendChild(ratingGradient);
			var ratingDiv = document.createElement("div");
			ratingDiv.className = "rating";
			if (isSuggestions) {
				ratingDiv.innerHTML = '<span class="suggested"><i class="material-icons">info</i> Suggested</span><span>'+contents[moviesList[entry]].rating+'</span><i class="material-icons">star</i>';
			} else {
				ratingDiv.innerHTML = '<span>'+contents[moviesList[entry]].rating+'</span><i class="material-icons">star</i>';
			}
			movie.appendChild(ratingDiv);
			var thumbGradient = document.createElement("div");
			thumbGradient.className = "gradient";
			movie.appendChild(thumbGradient);
			var title = document.createElement("div");
			title.className = "title";
				var span = document.createElement("span");
				span.innerHTML = contents[moviesList[entry]].title;
				span.title = contents[moviesList[entry]].title;
				title.appendChild(span);
			movie.appendChild(title);
		movieList.appendChild(movie);
	}
}

function fillLists(listsList) {
	if (listsList.length == 0) {
		$('#noListResults').show();
	}
	
	var listList = document.getElementById("listList");
	for (entry in listsList){
		var list = document.createElement("div");
		list.className = "content";
		list.value = 'user='+listsList[entry][0]+'&id='+listsList[entry][1];
		list.onclick = function(){ window.location = './list.html?'+this.value; };
			var thumbnail = document.createElement("img");
			thumbnail.className = "thumbnail";
			thumbnail.src = users[listsList[entry][0]].lists[listsList[entry][1]].thumbnail;
			list.appendChild(thumbnail);
			var thumbGradient = document.createElement("div");
			thumbGradient.className = "gradient";
			list.appendChild(thumbGradient);
			var title = document.createElement("div");
			title.className = "title";
				var span = document.createElement("span");
				span.innerHTML = users[listsList[entry][0]].lists[listsList[entry][1]].title;
				span.title = users[listsList[entry][0]].lists[listsList[entry][1]].title;
				title.appendChild(span);
				var span2 = document.createElement("span");
				span2.style = "opacity: 0.7;font-size: 12px;vertical-align: middle;";
				span2.innerHTML = "by "+users[listsList[entry][0]].name;
				span2.title = "by "+users[listsList[entry][0]].name;
				title.appendChild(span2);
			list.appendChild(title);
		listList.appendChild(list);
	}
}

function fillUsers(usersList) {
	if (usersList.length == 0) {
		$('#noUserResults').show();
	}
	
	var userList = document.getElementById("userList");
	for (entry in usersList){
		var user = document.createElement("div");
		user.className = "content center smaller";
		user.title = users[usersList[entry]].name;
		user.value = usersList[entry];
		user.onclick = function(){ window.location = './user.html?id='+this.value; };
			var thumbnail = document.createElement("img");
			thumbnail.className = "avatar large";
			thumbnail.src = users[usersList[entry]].avatar;
			user.appendChild(thumbnail);
			var username = document.createElement("div");
			username.className = "username";
			username.innerHTML = users[usersList[entry]].name;
			user.appendChild(username);
		userList.appendChild(user);
	}
}