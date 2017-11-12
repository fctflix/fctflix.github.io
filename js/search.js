var query = getQueryParameterByName("q");
if (query == null || query == "" || query.length <= 0){
	alert('Invalid query');
	window.location = '../dashboard.html';
}
$(document).ready(function() {
	document.getElementById("searchbar").value = query;

	//TODO REMOVE
	alert("See console for TODO list");
	console.log('//TODO Search; Filters; Filters layout; Fill with real data');
});