$(document).ready(function() {

	console.log("//TODO: something about the lists i dont know")
	populateLists();
	populateUsers();

});

function populateLists() {
	var showTV = $('#tv:checked').length > 0
	var showMovies = $('#movies:checked').length > 0
	for(cat of $(".shows")) {
		var genre = cat.id
		var contentList = cat.getElementsByClassName("contentList")[0]
		contentList.innerHTML = ""
		for(var i = 0; i < contents.length; i++) {
			var show = contents[i]
			if(show.genres.includes(genre) && ((show.isShow && showTV) || (!show.isShow && showMovies))) {
				var content = document.createElement("div")
				content.className = "content"
				content.value = i
				content.onclick = function() {
					window.location = './show/index.html?id='+this.value;
				}
				var thumbnail = document.createElement("img")
				thumbnail.className = "thumbnail"
				thumbnail.src = show.thumbnail;
				content.appendChild(thumbnail)
				var gradientTop = document.createElement("div")
				gradientTop.className = "gradient-top"
				content.appendChild(gradientTop)
				var rating = document.createElement("div")
				rating.className = "rating"
				rating.innerHTML = show.rating + "<i class=\"material-icons align\">star</i>"
				content.appendChild(rating)
				var gradientBtm = document.createElement("div")
				gradientBtm.className = "gradient"
				content.appendChild(gradientBtm)
				var title = document.createElement("div")
				title.className = "title"
				title.innerHTML = show.title
				content.appendChild(title)
				contentList.appendChild(content)
			}
		}
	}
}

function populateUsers() {
	var userList = $("#users > .contentList")
	for(var i = 0; i < users.length; i++) {
		var user = users[i];
		if(user == users[0]) continue; //current user shouldn't appear in the list?
		var content = document.createElement("div");
		content.className = "content center smaller";
		content.title = user.name;
		content.value = i;
		content.onclick = function(){ window.location = './user.html?id='+this.value; };
			var thumbnail = document.createElement("img");
			thumbnail.className = "avatar large";
			thumbnail.src = user.avatar;
			content.appendChild(thumbnail);
			var title = document.createElement("div");
			title.className = "username";
			title.innerHTML = user.name;
			content.appendChild(title);
		userList.append(content);
	}
}