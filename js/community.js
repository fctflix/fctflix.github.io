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
	poster.onclick = function(){ window.location = '/show/index.html?id='+contentId; };
	if (contents[contentId].isShow) {
		poster.title = "Go to show page";
	} else {
		poster.title = "Go to movie page";
	}

	//Title
	var title = document.getElementById('contentTitle');
	title.innerHTML = contents[contentId].title;
	title.onclick = function(){ window.location = '/show/index.html?id='+contentId; };
	if (contents[contentId].isShow) {
		title.title = "Go to show page";
	} else {
		title.title = "Go to movie page";
	}

	//Community + num subscribers
	var numSubs = document.getElementById('numSubs');
	numSubs.innerHTML = "Community - " + contents[contentId].subscribers + " subscribers"
	numSubs.onclick = function(){ window.location = '/show/community.html?id='+contentId; };
	if (contents[contentId].isShow) {
		numSubs.title = "Go to show community";
	} else {
		numSubs.title = "Go to movie community";
	}

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

	var posts = contents[contentId].posts.slice();
	posts.sort( (a,b) => Date.parse(b["date"]) - Date.parse(a["date"]))
	var postHTML = []

	for(var i = 0; i < posts.length; i++) {
		var post = posts[i]
		//main div
		var post_main = document.createElement("div")
		post_main.className = "post"
		//the post contents
		var post_card = document.createElement("div")
		post_card.className = "card large"
		//show comments button
		var comm_btn = document.createElement("button")
		comm_btn.className = "show-comments"
		comm_btn.innerHTML = "View "+post.comments.length+" comment"
		if(post.comments.length != 1) {
			comm_btn.innerHTML += "s"
		}
		comm_btn.value = contents[contentId].posts.indexOf(post)
		comm_btn.onclick = function() {
			window.location = "../post.html?community="+contentId+"&postId="+this.value
		}
		//Container for the top elements of the post
		var post_top = document.createElement("div");
		post_top.className = "post-top";
		//the post avatar
		var post_avatar = document.createElement("div")
		post_avatar.className = "post-avatar"
		//the actual image
		var avatar_img = document.createElement("img")
		avatar_img.className = "avatar small"
		avatar_img.src = users[post.user].avatar
		avatar_img.title = users[post.user].name
		post_avatar.appendChild(avatar_img)
		post_top.appendChild(post_avatar)
		//post votes amount
		var post_votes = document.createElement("div")
		post_votes.className = "post-votes"
		var num_votes = document.createElement("div")
		num_votes.value = contents[contentId].posts.indexOf(post)
		num_votes.className = "center"
		num_votes.innerHTML = post.likes.length - post.dislikes.length
		var post_up = document.createElement("div")
		post_up.innerHTML = "keyboard_arrow_up"
		var post_down = document.createElement("div")
		post_down.innerHTML = "keyboard_arrow_down"
		post_down.className = post_up.className = "material-icons votes pointnclick"

		if ($.inArray(0, post.likes) != -1) {
			post_up.className += " active"; // Liked
		}
		post_up.onclick = function(){ votePost($(this), true); };
		if ($.inArray(0, post.dislikes) != -1) {
			post_down.className += " active"; // Disliked
		}
		post_down.onclick = function(){ votePost($(this), false); };

		post_votes.appendChild(post_up)
		post_votes.appendChild(num_votes)
		post_votes.appendChild(post_down)
		post_top.appendChild(post_votes)
		//post title
		var post_title = document.createElement("h4")
		var post_title2 = document.createElement("span")
		post_title2.className = post_title.className = "post-title"
		post_title2.innerHTML = post.title
		post_title.appendChild(post_title2)
		post_top.appendChild(post_title)
		//timestamp
		var post_time = document.createElement("div")
		post_time.className = "post-timestamp"
		post_time.innerHTML = calculateTimeDifference(post.date)
		post_time.title = post.date;
		post_top.appendChild(post_time)

		post_card.appendChild(post_top);
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
	if (document.getElementById("postTitle").value == "" || document.getElementById("postText").value == "") {
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
	newPost.likes = [0];
	newPost.dislikes = [];

	if (!validatePost(true)) return

	document.getElementById("postPost").disabled = true;
	document.getElementById("cancelPost").disabled = true;

	console.log('Saving to localStorage...');
	contents[contentId].posts.push(newPost);
	saveContents();

	showSnackbar("Thanks for your post on <b>"+contents[contentId].title+"</b>'s community!");

	setTimeout(location.reload.bind(location), 2500);
}

function votePost(context, like){
	if(context.hasClass("active")) return
	var parentChildren = context.parent().children()
	var postId = parentChildren[1].value
	var userId = 0;

	//Remove old vote
	contents[contentId].posts[postId].likes = jQuery.grep(contents[contentId].posts[postId].likes, function(value) { return value != userId; });
	contents[contentId].posts[postId].dislikes = jQuery.grep(contents[contentId].posts[postId].dislikes, function(value) { return value != userId; });

	//Add new vote
	if (like) {
		parentChildren[0].className += " active";
		parentChildren[2].classList.remove("active");	
		contents[contentId].posts[postId].likes.push(userId);
	} else {
		parentChildren[0].classList.remove("active");
		parentChildren[2].className += " active";	
		contents[contentId].posts[postId].dislikes.push(userId);
	}

	//Save in the db
	saveContents();

	//Update count
	var likes = contents[contentId].posts[postId].likes.length;
	var dislikes = contents[contentId].posts[postId].dislikes.length;
	parentChildren[1].innerHTML = likes - dislikes;

	showSnackbar("Thank you for your feedback!");
}