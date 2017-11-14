$(document).ready(function() {

	fillNextWatches();
	fillLists();
	fillRecentWatched();
	fillRecommendations();

});

function fillNextWatches() {
	console.log("//TODO: get user's next episodes to watch")
}

function fillLists() {
	console.log("Filling with user's lists")
	//uhh we should check who is logged in instead of using zero but ok
	for(list of users[0].lists) {
		var content = document.createElement("div")
		content.className = "content"
		content.onclick = function() {
			alert('this does not work yet :(');
		}
		var thumbnail = document.createElement("img")
		thumbnail.className = "thumbnail"
		thumbnail.src = list.thumbnail
		content.appendChild(thumbnail)
		var gradient = document.createElement("div")
		gradient.className = "gradient"
		content.appendChild(gradient)
		var title = document.createElement("div")
		title.className = "title"
		title.innerHTML = list.title
		content.appendChild(title)
		$("#your_lists > .contentList").append(content)
	}
}

function fillRecentWatched() {
	console.log("//TODO: get recently watched stuff")
}

function fillRecommendations() {
	console.log("//TODO: get recommendations from friends")
	//uhh we should check who is logged in instead of using zero but ok
	for(user of users[0].following) {
		var content = document.createElement("div")
		content.className = "content"
		content.onclick = function() {
			alert('this does not work yet :(');
		}
		var thumbnail = document.createElement("img")
		thumbnail.className = "thumbnail"
		thumbnail.src = "https://www.fiweh.com/wp-content/uploads/2017/10/thewatchlist.png" //temporary
		content.appendChild(thumbnail)
		var gradient = document.createElement("div")
		gradient.className = "gradient"
		content.appendChild(gradient)
		var title = document.createElement("div")
		title.className = "title"
		title.innerHTML = contents[users[user].recommendedShow].title
		content.appendChild(title)
		var recom_title = document.createElement("div")

		recom_title.className = "recom-title"
		var avatar = document.createElement("img")
		avatar.className = "avatar-verysmall"
		avatar.src = users[user].avatar
		recom_title.appendChild(avatar)
		var span1 = document.createElement("span")
		span1.innerHTML = "Recommended by:"
		var span2 = document.createElement("span")
		span2.className = "recom-name"
		span2.innerHTML = users[user].name
		span2.title = users[user].name
		span1.appendChild(span2)
		recom_title.appendChild(span1)

		var content_main = document.createElement("div")
		content_main.className = "content"
		content_main.appendChild(content)
		content_main.appendChild(recom_title)
		$("#recommend > .contentList").append(content_main)
	}
}