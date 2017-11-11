/* Who needs servers and databases when you can just fake it with a little bit of JS witchcraft!

> contents[0].seasons[2].episodes[1].title
< "Rickmancing the Stone"

> contents[0].actors[2].character
< "Beth Smith"

> contents[1].reviews[0].text
< "A review that doesn't say anything an interest viewer needs."

> document.getElementById("overlay").style.background = "url('"+users[contents[0].reviews[1].user].avatar+"')"
< "url('https://img1.etsystatic.com/041/1/5493921/il_340x270.572585825_n5px.jpg')"

> contents[0].posts[0].comments[0].text
< "I'M PICKLE RICK!"

*/

var users, contents;

function reset(){
	localStorage.clear();
	localStorage["firstRunOccurred"] = false;
	window.location.reload();
}

function defaultUsers(){
	return [
			{"name": "Doggo",
			"avatar": "/images/default_avatar.jpg"
			},
			{"name": "JamesDoe",
			"avatar": "https://i.imgur.com/TdYZdrY.jpg"
			},
			{"name": "SchrondingerFedora",
			"avatar": "https://img1.etsystatic.com/041/1/5493921/il_340x270.572585825_n5px.jpg"
			},
			{"name": "PeteTheFrog",
			"avatar": "http://dazedimg.dazedgroup.netdna-cdn.com/786/azure/dazed-prod/1140/3/1143350.jpg"
			},
			{"name": "Sethmore",
			"avatar": "https://www.mcdonalds.com/content/dam/Canada/en/product_pages/snacks-sides/hero/hero_world-famous-fries.png"
			}];
}

function defaultContents(){
	return [
			{"title": "Rick and Morty",
			"isShow": true,
			"poster": "https://walter.trakt.tv/images/shows/000/069/829/posters/thumb/16434b4797.jpg",
			"rating": 4.7,
			"airs": "Mondays at 23PM",
			"network": "Comedy Central",
			"language": "English",
			"genres": ["Animation","Comedy","SciFi"],
			"synopsis": "A sociopathic scientist drags his unintelligent grandson on insanely dangerous adventures across the universe.",
			"seasons": [
						{"episodes":[
							{"title": "Pilot",
							"thumbnail": "https://walter.trakt.tv/images/episodes/001/167/595/screenshots/thumb/38d22c0db6.jpg"
							},
							{"title": "Lawnmower Dog",
							"thumbnail": "https://walter.trakt.tv/images/episodes/001/167/687/screenshots/thumb/4ee1e54f1c.jpg"
							}]
						},
						{"episodes":[
							{"title": "A Rickle in Time",
							"thumbnail": "https://walter.trakt.tv/images/episodes/001/732/564/screenshots/thumb/f7b6963a5c.jpg"
							},
							{"title": "Mortynight Run",
							"thumbnail": "https://walter.trakt.tv/images/episodes/001/917/687/screenshots/thumb/471994ccd6.jpg"
							}]
						},
						{"episodes":[
							{"title": "The Rickshank Rickdemption",
							"thumbnail": "https://walter.trakt.tv/images/episodes/002/530/948/screenshots/thumb/d854c1a3cd.jpg"
							},
							{"title": "Rickmancing the Stone",
							"thumbnail": "https://walter.trakt.tv/images/episodes/002/560/335/screenshots/thumb/d670eeff72.jpg"
							}]
						}],
			"actors": [
						{"name": "Justin Roiland",
						"character": "Rick Sanchez / Morty Smith",
						"photo": "https://walter.trakt.tv/images/people/000/471/529/headshots/thumb/fe304eb105.jpg",
						"imdb": "https://www.imdb.com/name/nm1551598/"
						},
						{"name": "Chris Parnell",
						"character": "Jerry Smith",
						"photo": "https://walter.trakt.tv/images/people/000/421/126/headshots/thumb/dfe58f45de.jpg",
						"imdb": "https://www.imdb.com/name/nm0663177/"
						},
						{"name": "Sarah Chalke",
						"character": "Beth Smith",
						"photo": "https://walter.trakt.tv/images/people/000/428/041/headshots/thumb/65a865ff57.jpg",
						"imdb": "https://www.imdb.com/name/nm0149950/"
						},
						{"name": "Spencer Grammer",
						"character": "Summer Smith",
						"photo": "https://walter.trakt.tv/images/people/000/434/202/headshots/thumb/45d54aec34.jpg",
						"imdb": "https://www.imdb.com/name/nm0334561/"
						}],
			"reviews": [
						{"user": 1,
						"rating": 4,
						"date": "2017-09-21 07:40",
						"text": "A smart show that's constantly hilarious and packed with great characters. A must watch!",
						"likes": 92,
						"dislikes": 8
						},
						{"user": 2,
						"rating": 5,
						"date": "2017-03-02 17:42",
						"text": "To be fair, you have to have a very high IQ to understand Rick and Morty. The humour is extremely subtle, and without a solid grasp of theoretical physics most of the jokes will go over a typical viewer’s head. There’s also Rick’s nihilistic outlook, which is deftly woven into his characterisation- his personal philosophy draws heavily from Narodnaya Volya literature, for instance. The fans understand this stuff; they have the intellectual capacity to truly appreciate the depths of these jokes, to realise that they’re not just funny- they say something deep about LIFE. As a consequence people who dislike Rick & Morty truly ARE idiots- of course they wouldn’t appreciate, for instance, the humour in Rick’s existential catchphrase “Wubba Lubba Dub Dub,” which itself is a cryptic reference to Turgenev’s Russian epic Fathers and Sons. I’m smirking right now just imagining one of those addlepated simpletons scratching their heads in confusion as Dan Harmon’s genius wit unfolds itself on their television screens. What fools.. how I pity them. 😂 And yes, by the way, i DO have a Rick & Morty tattoo. And no, you cannot see it. It’s for the ladies’ eyes only- and even then they have to demonstrate that they’re within 5 IQ points of my own (preferably lower) beforehand. Nothin personnel kid 😎",
						"likes": 69,
						"dislikes": 31
						},
						{"user": 3,
						"rating": 1,
						"date": "2017-04-20 02:57",
						"text": "Bland show for neckbeards!",
						"likes": 1,
						"dislikes": 99
						}],
			"posts": [
						{"user": 3,
						"title": "WUBBA LUBBA DUB DUB",
						"date": "2017-08-20 02:57",
						"text": "And that's the way the news goes!",
						"likes": 1,
						"dislikes": 99,
						"comments": [
									{"user": 3,
									"date": "2017-08-20 02:58",
									"text": "I'M PICKLE RICK!",
									"likes": 1,
									"dislikes": 99
									},
									{"user": 3,
									"date": "2017-08-20 02:59",
									"text": "TIME TO GET SCHWIFTY!",
									"likes": 1,
									"dislikes": 99
									},
									{"user": 3,
									"date": "2017-08-20 03:00",
									"text": "wow u guys are really butthurt XD",
									"likes": 1,
									"dislikes": 99
									}]
						}]
			},
			{"title": "Fifty Shades Darker",
			"isShow": false,
			"poster": "https://walter.trakt.tv/images/movies/000/222/332/posters/thumb/5efccbca57.jpg",
			"rating": 3.4,
			"released": "2017-02-10",
			"language": "English",
			"genres": ["Drama"],
			"synopsis": "When a wounded Christian Grey tries to entice a cautious Ana Steele back into his life, she demands a new arrangement before she will give him another chance. As the two begin to build trust and find stability, shadowy figures from Christian’s past start to circle the couple, determined to destroy their hopes for a future together.",
			"actors": [
						{"name": "Dakota Johnson",
						"character": "Anastasia Steele",
						"photo": "https://walter.trakt.tv/images/people/000/438/351/headshots/thumb/271ef4ea5d.jpg",
						"imdb": "https://www.imdb.com/name/nm0424848/"
						},
						{"name": "Jamie Dornan",
						"character": "Christian Grey",
						"photo": "https://walter.trakt.tv/images/people/000/416/100/headshots/thumb/d7ec4c7a4a.jpg"
						}],
			"reviews": [
						{"user": 4,
						"rating": 3,
						"date": "2017-10-02 17:52",
						"text": "A review that doesn't say anything an interest viewer needs.",
						"likes": 1,
						"dislikes": 0
						}],
			"posts": [
						{"user": 3,
						"title": "Still a better love story than Twilight",
						"date": "2017-08-25 03:57",
						"text": "see title",
						"likes": 1,
						"dislikes": 79,
						"comments": [
									{"user": 3,
									"date": "2017-08-25 06:18",
									"text": "why the downvotes?",
									"likes": 1,
									"dislikes": 18
									}]
						}]
			}];
}

function saveUsers(){
	localStorage["users"] = JSON.stringify(users);
}

function loadUsers(){
	users = JSON.parse(localStorage["users"]);
}
function saveContents(){
	localStorage["contents"] = JSON.stringify(contents);
}

function loadContents(){
	contents = JSON.parse(localStorage["contents"]);
}

if (localStorage["firstRunOccurred"] !== undefined && localStorage["firstRunOccurred"] == "true"){
	console.log('Loading from localStorage...');
	loadUsers();
	loadContents();
} else {
	console.log('First time visit.');
	users = defaultUsers();
	contents = defaultContents();
	
	console.log('Saving to localStorage...');
	saveUsers();
	saveContents();

	localStorage["firstRunOccurred"] = true;
}