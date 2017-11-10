$(document).ready(function() {
	var contentId = Number.parseInt(getQueryParameterByName("id"));
	if (isNaN(contentId) || contentId > contents.length || contentId < 0){
		alert('Invalid content id');
		window.location = './dashboard.html';
	}
	alert('content title is: '+contents[contentId].title+'. See console for TODO list');
	console.log('//TODO Use fake db to populate data (whether show or movie); Figure out how we are going to update this data; Add to list; Add Review; Like/Dislike Review');

	$('#gotoCommunity').click(function() { window.location = './community.html?content='+contentId});
});