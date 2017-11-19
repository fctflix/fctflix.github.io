$(document).ready(function() {

	setupSubscriptions();
	fillCommunityPosts();

});

function setupSubscriptions() {
	//uhh we should check who is logged in instead of using zero but ok
	for(sub of users[0].subscriptions) {
		var content = document.createElement("div")
		content.className = "content"
		content.onclick = function() {
			window.location = './show/community.html?id='+sub;
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
		title.innerHTML = contents[sub].title+"<br>"+contents[sub].subscribers+" subscribers"
		content.appendChild(title)
		$("#communityList").append(content)
	}
}

function fillCommunityPosts() {
	console.log("Filling the community with posts...");

	var posts = []
	for(var i = 0; i < contents.length; i++) {
		var show = contents[i]
		for(post of show.posts) {
			posts.push({"community":i, "post":post})
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
		comm_btn.value = posts[i].community+"&postId="+contents[posts[i].community].posts.indexOf(post)
		comm_btn.onclick = function() {
			window.location = "./post.html?community="+this.value
		}
		//the post avatar
		var post_avatar = document.createElement("div")
		post_avatar.className = "post-avatar"
		//the actual image
		var avatar_img = document.createElement("img")
		avatar_img.className = "avatar small"
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