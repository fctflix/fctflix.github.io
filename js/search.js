var query, genres, year1, year2, rating;

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
	genres = getQueryParameterByName("g");
	if (genres == null){
		genres = ['test','derp'];
	} else {
		genres = genres.split(',');
	}
	fillGenres(genres);

	console.log("gothere");
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
	console.log('//TODO Genres dropdown # select text in button; Filters only apply to tv and movies; Suggestions; Search; Filters; Filters layout; Fill with real data');
});

function fillGenres(g) {
	console.log("TODO fill genres");
	console.log(g);
}

function filterRate(r) {
	rating = r;
	var rateStr = '';
	if (r == 0){
		rateStr = '<span style="font-size: 24px;vertical-align: middle;"></span></span>All</span>'; //empty span because of layout issues and I don't want to change the size of the text
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

	if (year1 > year2) {
		document.getElementById("year1Filter").value = year2;
		document.getElementById("year2Filter").value = year1;
		var tmp = year1;
		year1 = year2;
		year2 = tmp;
	}
	window.location = "./search.html?q="+encodeURIComponent(query)+"&g="+encodeURIComponent(genres)+"&y1="+encodeURIComponent(year1)+"&y2="+encodeURIComponent(year2)+"&r="+encodeURIComponent(rating);
}

function searchDb() {
	console.log("This will be fun to implement");
}