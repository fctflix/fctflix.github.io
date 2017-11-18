var query, selectedGenres, year1, year2, rating;
var genres = ["Action", "Adventure", "Animation", "Comedy", "Drama", "Fantasy", "Horror", "SciFi"];

$(document).ready(function() {
	//Fill query
	query = getQueryParameterByName("q");
	if (query == null){
		query = "";
	}
	if (query.length > 0){
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

	//TODO REMOVE
	console.log('//TODO Filters only apply to tv and movies; Search; Suggestions if no results; Filters; Fill with real data');
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
	console.log("This will be fun to implement");
}