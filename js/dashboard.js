$(document).ready(function() {

	fillNextWatches();
	fillLists();
	fillRecentWatched();
	fillRecommendations();

});

function fillNextWatches() {
	console.log("Getting user's next episodes to watch")
	var showsIdx = []
	var lastEps = []
	//uhh we should check who is logged in instead of using zero but ok
	for(var i = 0; i < users[0].history.length; i++) {
		var hist = users[0].history[i]
		if(showsIdx.indexOf(hist.show) < 0 ) {
			showsIdx.push(hist.show)
			lastEps.push(hist)
		} else {
			var currHist = lastEps[showsIdx.indexOf(hist.show)]
			if(hist.season > currHist.season || (hist.season == currHist.season && hist.episode > currHist.episode)) {
				lastEps[showsIdx.indexOf(hist.show)] = hist
			}
		}
	}

	var episodes = []
	for(var i = 0; i < showsIdx.length; i++) {
		var eachShow = contents[showsIdx[i]]
		if(eachShow.isShow) {
			var lastEp = lastEps[i]
			var show = lastEp.show
			var season = lastEp.season
			var episode = lastEp.episode + 1
			var nextEp = eachShow.seasons[season].episodes[episode]
			if(nextEp === undefined) {
				season = season + 1
				episode = 0
				nextEp = eachShow.seasons[season]
				if(nextEp !== undefined) nextEp = nextEp.episodes[episode]
			}
			if(nextEp !== undefined) {
				var content = document.createElement("div")
				content.className = "content"
				content.value = show+'&'+"season="+(season+1)+"&episode="+(episode+1);
				content.onclick = function(){ window.location = './player.html?contentId='+this.value; };
					var thumbnail = document.createElement("img")
					thumbnail.className = "thumbnail"
					content.appendChild(thumbnail)
					var gradient = document.createElement("div")
					gradient.className = "gradient"
					content.appendChild(gradient)
					var play_cont = document.createElement("div")
					play_cont.className = "playContainer"
						var gradient2 = document.createElement("div")
						gradient2.className = "gradient"
						play_cont.appendChild(gradient2)
						var play = document.createElement("div")
						play.className = "play"
						play_cont.appendChild(play)
						content.appendChild(play_cont)
					var title = document.createElement("div")
					title.className = "title"
					content.appendChild(title)
					if(contents[show].isShow) {
						thumbnail.src = contents[show].seasons[season].episodes[episode].thumbnail
						title.style = "height: 50px;";
						title.innerHTML = contents[show].title+'<br><b>'+getEpisodeSeasonStr(season+1,episode+1)+'</b><span>'+contents[show].seasons[season].episodes[episode].title+'</span>';
						title.title = 'Watch '+contents[show].title+' - '+getEpisodeSeasonStr(season+1,episode+1)+' - '+contents[show].seasons[season].episodes[episode].title;
					} else {
						thumbnail.src = contents[show].thumbnail
						title.innerHTML = contents[show].title
						title.title = contents[show].title
					}
				$("#cont_watch > .contentList").prepend(content)
			}
		}
	}
}

function fillLists() {
	console.log("Filling with user's lists")
	//uhh we should check who is logged in instead of using zero but ok
	var i = 0;
	for(list of users[0].lists) {
		var content = document.createElement("div")
		content.className = "content"
		content.value = i;
		content.onclick = function() {
			window.location = 'list.html?owner=0&listId='+this.value;
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
			title.title = list.title
			content.appendChild(title)
		$("#your_lists > .contentList").append(content)
		i++;
	}
}

function fillRecentWatched() {
	console.log("Getting user's history")
	//uhh we should check who is logged in instead of using zero but ok
	for(hist of users[0].history) {
		var show = hist.show
		var season = hist.season
		var episode = hist.episode
		var content = document.createElement("div")
		content.className = "content"
		content.value = show;
		content.onclick = function() {
			window.location = './show/index.html?id='+this.value;
		}
			var thumbnail = document.createElement("img")
			thumbnail.className = "thumbnail"
			content.appendChild(thumbnail)
			var gradient = document.createElement("div")
			gradient.className = "gradient"
			content.appendChild(gradient)
			var title = document.createElement("div")
			title.className = "title"
			content.appendChild(title)
			if(contents[show].isShow) {
				thumbnail.src = contents[show].seasons[season].episodes[episode].thumbnail
				title.style = "height: 50px;";
				title.innerHTML = contents[show].title+'<br><b>'+getEpisodeSeasonStr(season+1,episode+1)+'</b><span>'+contents[show].seasons[season].episodes[episode].title+'</span>';
				title.title = contents[show].title+' - '+getEpisodeSeasonStr(season+1,episode+1)+' - '+contents[show].seasons[season].episodes[episode].title;
			} else {
				thumbnail.src = contents[show].thumbnail
				title.innerHTML = contents[show].title
				title.title = contents[show].title
			}
		$("#recent > .contentList").prepend(content)
	}
}

function fillRecommendations() {
	//uhh we should check who is logged in instead of using zero but ok
	for(user of users[0].following) {
		var content_main = document.createElement("div");
		content_main.className = "contentContainer";
			var content = document.createElement("div");
			content.className = "content";
			content.value = users[user].recommendedShow;
			content.onclick = function() {
				window.location = './show/index.html?id='+this.value;
			}
				var thumbnail = document.createElement("img");
				thumbnail.className = "thumbnail";
				thumbnail.src = contents[users[user].recommendedShow].thumbnail;
				content.appendChild(thumbnail);
				var gradient = document.createElement("div");
				gradient.className = "gradient";
				content.appendChild(gradient);
				var title = document.createElement("div");
				title.className = "title";
				title.innerHTML = contents[users[user].recommendedShow].title;
				title.title = contents[users[user].recommendedShow].title;
				content.appendChild(title);
			content_main.appendChild(content);
			var recom_title = document.createElement("div");
			recom_title.className = "recom-title";
				var avatar = document.createElement("img");
				avatar.className = "avatar tiny";
				avatar.src = users[user].avatar;
				recom_title.appendChild(avatar);
				var span1 = document.createElement("span");
				span1.innerHTML = "Recommended by:";
					var a = document.createElement("a");
					a.className = "recom-name";
					a.href = "user.html?id="+user;
					a.innerHTML = users[user].name;
					a.title = users[user].name;
					span1.appendChild(a);
				recom_title.appendChild(span1);
			content_main.appendChild(recom_title);
		$("#recommend > .contentList").append(content_main);
	}
	//temporary recommendations algorithm (just random content)
	for(var i = users[0].following.length; i<5; i++) {
		var suggestedId = randomIntFromInterval(0, contents.length-1);

		var content_main = document.createElement("div");
		content_main.className = "contentContainer";
			var content = document.createElement("div");
			content.className = "content";
			content.value = suggestedId;
			content.onclick = function() {
				window.location = './show/index.html?id='+this.value;
			}
				var thumbnail = document.createElement("img");
				thumbnail.className = "thumbnail";
				thumbnail.src = contents[suggestedId].thumbnail;
				content.appendChild(thumbnail);
				var gradient = document.createElement("div");
				gradient.className = "gradient";
				content.appendChild(gradient);
				var title = document.createElement("div");
				title.className = "title";
				title.innerHTML = contents[suggestedId].title;
				title.title = contents[suggestedId].title;
				content.appendChild(title);
			content_main.appendChild(content);
			var recom_title = document.createElement("div");
			recom_title.className = "recom-title";
				var avatar = document.createElement("img");
				avatar.className = "avatar tiny";
				avatar.src = "images/logo.png";
				recom_title.appendChild(avatar);
				var span1 = document.createElement("span");
				span1.innerHTML = "Recommended by:";
					var span2 = document.createElement("span");
					span2.className = "recom-name";
					span2.innerHTML = "FCTFlix";
					span2.title = "FCTFlix";
					span1.appendChild(span2);
				recom_title.appendChild(span1);
			content_main.appendChild(recom_title);
		$("#recommend > .contentList").append(content_main);
	}
}