var contentId = Number.parseInt(getQueryParameterByName("id"));
if (contentId == null || isNaN(contentId) || contentId >= contents.length || contentId < 0){
	alert('Invalid content id');
	window.location = '../dashboard.html';
}

$(document).ready(function() {

	setupCommunity();
	fillCommunityPosts();

});

function setupCommunity() {
	console.log("Preparing community info...");

	//Poster
	var poster = $("#showPoster")[0];
	poster.children[0].src = contents[contentId].poster;

	//Title
	document.getElementById('contentTitle').innerHTML = contents[contentId].title;

	//Community + num subscribers
	document.getElementById('numSubs').innerHTML = "Community - " + contents[contentId].subscribers + " subscribers"

	//Rating
	document.getElementById('contentRating').innerHTML = getRatingStarString(contents[contentId].rating);

	//Genres
	var genresString = "";
	for (i = 0; i < contents[contentId].genres.length; i++){
		if (genresString.length > 0){
			genresString += ", ";
		}
		genresString += contents[contentId].genres[i];
	}
	document.getElementById('genreList').innerHTML = genresString;

	//is subscribed or not
	updateSubscription()
}

function toggleSubscription() {
	if(users[0].subscriptions.includes(contentId)) {
		users[0].subscriptions = users[0].subscriptions.filter(e => e !== contentId)
		contents[contentId].subscribers--
	} else {
		users[0].subscriptions.push(contentId)
		contents[contentId].subscribers++
	}
	updateSubscription()
	saveUsers()
	saveContents()
}

function updateSubscription() {
	//uhh we should check who is logged in instead of using zero but ok
	if(users[0].subscriptions.includes(contentId)) {
		$("#subscribe").addClass("subscribed")
		$("#subscribe > span").html("Subscribed!")
	} else {
		$("#subscribe").removeClass("subscribed")
		$("#subscribe > span").html("Subscribe")
	}
}

function fillCommunityPosts() {
	console.log("Filling the community with posts...");

	var posts = contents[contentId].posts;
	posts.sort( (a,b) => Date.parse(b["date"]) - Date.parse(a["date"]))
	var postHTML = []

	for(var i = 0; i < posts.length; i++) {
		var post = posts[i]
		//main div
		var post_main = document.createElement("div")
		post_main.className = "post"
		post_main.id = i
		//the post contents
		var post_card = document.createElement("div")
		post_card.className = "card large"
		//show comments button
		var comm_btn = document.createElement("button")
		comm_btn.className = "show-comments"
		comm_btn.innerHTML = "Show "+post.comments.length+" comment"
		if(post.comments.length != 1) {
			comm_btn.innerHTML += "s"
		}
		//the post avatar
		var post_avatar = document.createElement("div")
		post_avatar.className = "post-avatar"
		//the actual image
		var avatar_img = document.createElement("img")
		avatar_img.className = "avatar-small"
		avatar_img.src = users[post.user].avatar
		post_avatar.appendChild(avatar_img)
		post_card.appendChild(post_avatar)
		//a small spacer thing
		var small_spacer = document.createElement("div")
		small_spacer.className = "small-spacer"
		post_card.appendChild(small_spacer)
		//post votes amount
		var post_votes = document.createElement("div")
		post_votes.className = "post-votes"
		var num_votes = document.createElement("div")
		num_votes.className = "center"
		num_votes.innerHTML = post.likes - post.dislikes
		var post_up = document.createElement("div")
		post_up.innerHTML = "keyboard_arrow_up"
		var post_down = document.createElement("div")
		post_down.innerHTML = "keyboard_arrow_down"
		post_down.className = post_up.className = "material-icons votes pointnclick"
		post_votes.appendChild(post_up)
		post_votes.appendChild(num_votes)
		post_votes.appendChild(post_down)
		post_card.appendChild(post_votes)
		//post title
		var post_title = document.createElement("h4")
		var post_title2 = document.createElement("span")
		post_title2.className = post_title.className = "post-title"
		post_title2.innerHTML = post.title
		post_title.appendChild(post_title2)
		post_card.appendChild(post_title)
		//timestamp
		var post_time = document.createElement("div")
		post_time.className = "post-timestamp"
		post_time.innerHTML = calculateTimeDifference(post.date)
		post_card.appendChild(post_time)
		//post content
		var post_content = document.createElement("div")
		post_content.className = "post-content"
		post_content.innerHTML = urlifyPost(post.text)
		post_card.appendChild(post_content)
		//end
		post_main.appendChild(post_card)
		post_main.appendChild(comm_btn)
		postHTML.push(post_main)
	}

	//this makes sure that both sides have a somewhat even height i think
	$(".left")[0].append(postHTML[0])
	var leftHeight = document.getElementsByClassName("discussion")[0].offsetHeight + postHTML[0].offsetHeight
	var rightHeight = 0

	for(var i = 1; i < postHTML.length; i++) {
		var elem = postHTML[i]
		if(leftHeight <= rightHeight) {
			$(".left")[0].append(elem)
			leftHeight += elem.offsetHeight
		} else {
			$(".right")[0].append(elem)
			rightHeight += elem.offsetHeight
		}
	}
}

function validatePost(showAlert){
	if (Number.parseInt(document.getElementById("postTitle").value) == "" || document.getElementById("postText").value == ""){
		document.getElementById("postPost").disabled = true;
		if (showAlert){
			alert("Make sure you've typed a title and message for your post");
		}
		return false;
	} else {
		document.getElementById("postPost").disabled = false;
		return true;
	}
}

function addPost(){
	var newPost = {};
	newPost.user = 0;
	newPost.comments = [];
	newPost.date = getCurrentDateTime();
	newPost.title = document.getElementById("postTitle").value;
	newPost.text = document.getElementById("postText").value;
	newPost.likes = 1;
	newPost.dislikes = 0;

	if (!validatePost(true)) return

	document.getElementById("postPost").disabled = true;
	document.getElementById("cancelPost").disabled = true;

	console.log('Saving to localStorage...');
	contents[contentId].posts.push(newPost);
	saveContents();

	showSnackbar("Thanks for your post on <b>"+contents[contentId].title+"</b>'s community!");

	setTimeout(location.reload.bind(location), 2500);
}