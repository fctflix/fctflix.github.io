$(document).ready(function() {

	setupSubscriptions();
	fillCommunityPosts();

});

function setupSubscriptions() {
	console.log("Setting up user's subscription list")
	//uhh we should check who is logged in instead of using zero but ok
	for(sub of users[0].subscriptions) {
		var content = document.createElement("div")
		content.className = "content"
		content.value = sub;
		content.onclick = function() {
			window.location = './show/community.html?id='+this.value;
		}
			var thumbnail = document.createElement("img")
			thumbnail.className = "thumbnail"
			thumbnail.src = contents[sub].thumbnail;
			content.appendChild(thumbnail)
			var gradient = document.createElement("div")
			gradient.className = "gradient"
			content.appendChild(gradient)
			var title = document.createElement("div")
			title.className = "title"
			title.innerHTML = contents[sub].title+"<br>"+contents[sub].subscribers+" subscribers"
			content.appendChild(title)
		$("#communityList").append(content)
	}
}

function fillCommunityPosts() {
	console.log("Filling the community with posts...");

	var posts = []
	for(sub of users[0].subscriptions) {
		var show = contents[sub];
		for(post of show.posts) {
			posts.push({"community":sub, "post":post})
		}		
	}
	
	posts.sort( (a,b) => Date.parse(b.post["date"]) - Date.parse(a.post["date"]))
	var postHTML = []

	for(var i = 0; i < posts.length; i++) {
		var post = posts[i].post
		//main div
		var post_main = document.createElement("div")
		post_main.className = "post"
		post_main.id = i
		post_main.value = posts[i].community
		//the post contents
			var post_card = document.createElement("div")
			post_card.className = "card large"
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
						post_avatar.appendChild(avatar_img)
					post_top.appendChild(post_avatar)
					//post votes amount
					var post_votes = document.createElement("div")
					post_votes.className = "post-votes"
						var num_votes = document.createElement("div")
						num_votes.value = contents[posts[i].community].posts.indexOf(post)
						num_votes.className = "center"
						num_votes.innerHTML = post.likes.length - post.dislikes.length
						var post_up = document.createElement("div")
						post_up.innerHTML = "keyboard_arrow_up"
						var post_down = document.createElement("div")
						post_down.innerHTML = "keyboard_arrow_down"
						post_down.className = post_up.className = "material-icons votes pointnclick"

						if ($.inArray(0, posts[i].likes) != -1) {
							post_up.className += " active"; // Liked
						}
						post_up.onclick = function(){ votePost($(this), true); };
						if ($.inArray(0, posts[i].dislikes) != -1) {
							post_down.className += " active"; // disliked
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
				comm_btn.innerHTML = "Show "+post.comments.length+" comment"
				if(post.comments.length != 1) {
					comm_btn.innerHTML += "s"
				}
				comm_btn.value = posts[i].community+"&postId="+contents[posts[i].community].posts.indexOf(post)
				comm_btn.onclick = function() {
					window.location = "./post.html?community="+this.value
				}
			//end
			post_main.appendChild(post_card)
			post_main.appendChild(comm_btn)
		postHTML.push(post_main)
	}

	//this makes sure that both sides have a somewhat even height i think
	var leftHeight = 0
	var rightHeight = 0

	for(var i = 0; i < postHTML.length; i++) {
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

function votePost(context, like){
	if(context.hasClass("active")) return
	var topChildren = context.parent().parent().parent().parent()
	var parentChildren = context.parent().children()
	var commId = topChildren[0].value
	var postId = parentChildren[1].value
	var userId = 0;

	//Remove old vote
	contents[commId].posts[postId].likes = jQuery.grep(contents[commId].posts[postId].likes, function(value) { return value != userId; });
	contents[commId].posts[postId].dislikes = jQuery.grep(contents[commId].posts[postId].dislikes, function(value) { return value != userId; });

	//Add new vote
	if (like) {
		parentChildren[0].className += " active";
		parentChildren[2].classList.remove("active");	
		contents[commId].posts[postId].likes.push(userId);
	} else {
		parentChildren[0].classList.remove("active");
		parentChildren[2].className += " active";	
		contents[commId].posts[postId].dislikes.push(userId);
	}

	//Save in the db
	saveContents();

	//Update count
	var likes = contents[commId].posts[postId].likes.length;
	var dislikes = contents[commId].posts[postId].dislikes.length;
	parentChildren[1].innerHTML = likes - dislikes;

	showSnackbar("Thank you for your feedback!");
}