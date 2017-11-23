var contentId = Number.parseInt(getQueryParameterByName("community"));
if (contentId == null || isNaN(contentId) || contentId >= contents.length || contentId < 0){
	alert('Invalid content id');
	window.location = './dashboard.html';
}

var postId = Number.parseInt(getQueryParameterByName("postId"));
if (postId == null || isNaN(postId) || postId >= contents[contentId].posts.length || postId < 0){
	alert('Invalid post id');
	window.location = './show/community.html?id='+contentId;
}

$(document).ready(function() {

	setupCommunity();
	fillPostAndComments();

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

function fillPostAndComments() {
	console.log("Filling in the post page...");

	var post = contents[contentId].posts[postId]

	//main div
	var post_main = document.createElement("div")
	post_main.className = "post"
	post_main.id = i
		//the post contents
		var post_card = document.createElement("div")
		post_card.className = "card large separator"
			//Container for the top elements of the post
			var post_top = document.createElement("div");
			post_top.className = "post-top";
				//the post avatar
				var post_avatar = document.createElement("div")
				post_avatar.className = "post-avatar"
					//the actual image
					var avatar_img = document.createElement("img")
					avatar_img.className = "avatar medium"
					avatar_img.src = users[post.user].avatar
					avatar_img.title = users[post.user].name
					post_avatar.appendChild(avatar_img)
				post_top.appendChild(post_avatar)
				//post votes amount
				var post_votes = document.createElement("div")
				post_votes.className = "post-votes"
					var num_votes = document.createElement("div")
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
			//show comments button
			var comm_btn = document.createElement("button")
			comm_btn.className = "show-comments"
			comm_btn.innerHTML = "Add comment"
			comm_btn.onclick = function() {
				//window.location = "../post?community="+contentId+"&postId="+i
				$('#overlay').show();
			}
			post_card.appendChild(comm_btn)
	//end
	post_main.appendChild(post_card)
	$(".full-post")[0].append(post_main)

	console.log("Filling post's comments...")
	for(var i = 0; i < post.comments.length; i++) {
		var comment = post.comments[i]
		var comment_main = document.createElement("div")
		comment_main.className = "comment"
			//the comment contents
			var comment_card = document.createElement("div")
			comment_card.className = "card large"
			if(i < post.comments.length - 1) comment_card.className += " separator"
				//Container for the top elements of the comment
				var comment_top = document.createElement("div");
				comment_top.className = "post-top comment";
					//the comment avatar
					var comment_avatar = document.createElement("div")
					comment_avatar.className = "post-avatar comment"
						//the actual image
						var comment_avatar_img = document.createElement("img")
						comment_avatar_img.className = "avatar small"
						comment_avatar_img.src = users[comment.user].avatar
						comment_avatar_img.title = users[comment.user].name
						comment_avatar.appendChild(comment_avatar_img)
					comment_top.appendChild(comment_avatar)
					//comment votes amount
					var comment_votes = document.createElement("div")
					comment_votes.className = "post-votes comment"
						var comment_num_votes = document.createElement("div")
						comment_num_votes.value = i
						comment_num_votes.className = "center"
						comment_num_votes.innerHTML = comment.likes.length - comment.dislikes.length
						var comment_up = document.createElement("div")
						comment_up.innerHTML = "keyboard_arrow_up"
						var comment_down = document.createElement("div")
						comment_down.innerHTML = "keyboard_arrow_down"
						comment_down.className = comment_up.className = "material-icons votes pointnclick"

						if ($.inArray(0, comment.likes) != -1) {
							comment_up.className += " active"; // Liked
						}
						comment_up.onclick = function(){ voteComment($(this), true); };
						if ($.inArray(0, comment.dislikes) != -1) {
							comment_down.className += " active"; // Liked
						}
						comment_down.onclick = function(){ voteComment($(this), false); };

						comment_votes.appendChild(comment_up)
						comment_votes.appendChild(comment_num_votes)
						comment_votes.appendChild(comment_down)
					comment_top.appendChild(comment_votes)
					//post title
					var comment_title = document.createElement("h4")
						var comment_title2 = document.createElement("span")
						comment_title2.className = comment_title.className = "post-title comment"
						comment_title2.innerHTML = urlifyPost(comment.text)
						comment_title.appendChild(comment_title2)
					comment_top.appendChild(comment_title)
					//timestamp
					var comment_time = document.createElement("div")
					comment_time.className = "post-timestamp"
					comment_time.innerHTML = calculateTimeDifference(comment.date)
					comment_time.title = comment.date;
					comment_top.appendChild(comment_time)

			comment_card.appendChild(comment_top);
		//end
		comment_main.appendChild(comment_card)
		$(".full-post")[0].append(comment_main)
	}
}

function validatePost(showAlert){
	if (document.getElementById("postText").value == ""){
		document.getElementById("postPost").disabled = true;
		if (showAlert){
			alert("Make sure you've typed a message for your comment");
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
	newPost.date = getCurrentDateTime();
	newPost.text = document.getElementById("postText").value;
	newPost.likes = [0];
	newPost.dislikes = [];

	if (!validatePost(true)) return

	document.getElementById("postPost").disabled = true;
	document.getElementById("cancelPost").disabled = true;

	console.log('Saving to localStorage...');
	contents[contentId].posts[postId].comments.push(newPost);
	saveContents();

	showSnackbar("Thanks for your comment on <b>"+contents[contentId].posts[postId].title+"</b>!");

	setTimeout(location.reload.bind(location), 2500);
}

function voteComment(context, like){
	if(context.hasClass("active")) return
	var parentChildren = context.parent().children()
	var commId = parentChildren[1].value
	var userId = 0;

	//Remove old vote
	contents[contentId].posts[postId].comments[commId].likes = jQuery.grep(contents[contentId].posts[postId].comments[commId].likes, function(value) { return value != userId; });
	contents[contentId].posts[postId].comments[commId].dislikes = jQuery.grep(contents[contentId].posts[postId].comments[commId].dislikes, function(value) { return value != userId; });

	//Add new vote
	if (like) {
		parentChildren[0].className += " active";
		parentChildren[2].classList.remove("active");	
		contents[contentId].posts[postId].comments[commId].likes.push(userId);
	} else {
		parentChildren[0].classList.remove("active");
		parentChildren[2].className += " active";	
		contents[contentId].posts[postId].comments[commId].dislikes.push(userId);
	}

	//Save in the db
	saveContents();

	//Update count
	var likes = contents[contentId].posts[postId].comments[commId].likes.length;
	var dislikes = contents[contentId].posts[postId].comments[commId].dislikes.length;
	parentChildren[1].innerHTML = likes - dislikes;

	showSnackbar("Thank you for your feedback!");
}

function votePost(context, like){
	if(context.hasClass("active")) return
	var parentChildren = context.parent().children()
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