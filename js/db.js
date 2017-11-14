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

/* Overclock database :D */
function reset(){
	localStorage.clear();
	localStorage["firstRunOccurred"] = false;
	window.location.reload();
}

/* Defaults */
function defaultUsers(){
	return [
			{"name": "Doggo",
			"avatar": "https://78.media.tumblr.com/84365fe19039b5fd917d6d449ca86290/tumblr_op4lb5DPRe1qg6rkio1_1280.jpg",
			"lists": [
						{
							"title": "Watchlist",
							"thumbnail": "https://www.fiweh.com/wp-content/uploads/2017/10/thewatchlist.png",
							"contents": [0,1]
						},
						{
							"title": "pew pew pew",
							"thumbnail": "https://uproxx.files.wordpress.com/2010/10/halo-dog-pew-pew-pew.jpg",
							"contents": [0,1]
						},
						{
							"title": "Shows with dogs in them",
							"thumbnail": "http://wallpaper.pickywallpapers.com/1280x720/shiba-inu.jpg",
							"contents": [0]
						},
						{
							"title": "kinky",
							"thumbnail": "http://mms.businesswire.com/media/20150812006323/en/480981/5/ExtraKinky_Logo_2-15HR1.jpg",
							"contents": [1]
						},
						{
							"title": "i dunno man",
							"thumbnail": "https://i.ytimg.com/vi/V3gdcindxRo/hqdefault.jpg",
							"contents": [0]
						}],
			"subscriptions": [0],
			"notifications": [
								{
									"type":"new_episode",
									"showId":0
								},
								{
									"type":"post_reply",
									"showId":0,
									"postId":3
								}],
			"following": [1,2,3,4],
			"recommendedShow": 2
			},
			{"name": "JamesDoe",
			"avatar": "https://i.imgur.com/TdYZdrY.jpg",
			"lists": [
						{
							"title": "Watchlist",
							"thumbnail": "https://www.fiweh.com/wp-content/uploads/2017/10/thewatchlist.png",
							"contents": [0,1]
						}],
			"subscriptions": [0],
			"notifications": [],
			"following": [],
			"recommendedShow": 2
			},
			{"name": "SchrondingerFedora",
			"avatar": "https://img1.etsystatic.com/041/1/5493921/il_340x270.572585825_n5px.jpg",
			"lists": [
						{
							"title": "Watchlist",
							"thumbnail": "https://www.fiweh.com/wp-content/uploads/2017/10/thewatchlist.png",
							"contents": [0,1]
						}],
			"subscriptions": [0,1],
			"notifications": [],
			"following": [],
			"recommendedShow": 2
			},
			{"name": "PeteTheFrog",
			"avatar": "http://dazedimg.dazedgroup.netdna-cdn.com/786/azure/dazed-prod/1140/3/1143350.jpg",
			"lists": [
						{
							"title": "Watchlist",
							"thumbnail": "https://www.fiweh.com/wp-content/uploads/2017/10/thewatchlist.png",
							"contents": [0,1]
						}],
			"subscriptions": [1],
			"notifications": [],
			"following": [],
			"recommendedShow": 2
			},
			{"name": "Sethmore",
			"avatar": "https://www.mcdonalds.com/content/dam/Canada/en/product_pages/snacks-sides/hero/hero_world-famous-fries.png",
			"lists": [
						{
							"title": "Watchlist",
							"thumbnail": "https://www.fiweh.com/wp-content/uploads/2017/10/thewatchlist.png",
							"contents": [0,1]
						}],
			"subscriptions": [1],
			"notifications": [],
			"following": [],
			"recommendedShow": 2
			}];
}
function defaultContents(){
	return [
			{"title": "Rick and Morty",
			"isShow": true,
			"year": 2013,
			"poster": "https://walter.trakt.tv/images/shows/000/069/829/posters/thumb/16434b4797.jpg",
			"rating": 4.7,
			"subscribers": 485001,
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
						"text": "And that's the way the news goes!http://dazedimg.dazedgroup.netdna-cdn.com/786/azure/dazed-prod/1140/3/1143350.jpg",
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
						},
						{"user": 2,
						"title": "the rick and morty copypasta but ran through google translate a few times",
						"date": "2017-11-10 05:31",
						"text": "We welcome IQ, Rick Morty to teach. The most humorous game and the typical audience in theoretical physics do not work solidly with subtlety. Fans. I realized that this is not only fun, but they must understand the power of deep intelligence games, but they say nothing is very important in life. As a result, people like to make Ricks really like, for example, when Russia's speech as epic poets for the new Rybakoven took a bad action \"VUB Lebanon is\" stupid and talented Dan Harmon because it is an imaginary addict that marks the confusion on your TV screen and scratches on your head and laughs now watching sons. Who's stupid to believe ... but not for them. News, yes by the way, I want Rick Morgan. You can not see women who are going to test for five years before IC (cheaper).",
						"likes": 500,
						"dislikes": 7,
						"comments": [
									{"user": 0,
									"date": "2017-11-10 12:01",
									"text": "why has no one commented yet? this is gret quality pasta",
									"likes": 0,
									"dislikes": 0
									}]
						},
						{"user": 2,
						"title": "the rick and morty copypasta but ran through google translate a few times",
						"date": "2017-11-10 17:31",
						"text": "We welcome IQ, Rick Morty to teach. The most humorous game and the typical audience in theoretical physics do not work solidly with subtlety. Fans. I realized that this is not only fun, but they must understand the power of deep intelligence games, but they say nothing is very important in life. As a result, people like to make Ricks really like, for example, when Russia's speech as epic poets for the new Rybakoven took a bad action \"VUB Lebanon is\" stupid and talented Dan Harmon because it is an imaginary addict that marks the confusion on your TV screen and scratches on your head and laughs now watching sons. Who's stupid to believe ... but not for them. News, yes by the way, I want Rick Morgan. You can not see women who are going to test for five years before IC (cheaper).",
						"likes": 4,
						"dislikes": 204,
						"comments": [
									{"user": 1,
									"date": "2017-11-10 17:45",
									"text": "please dont repost this shit.",
									"likes": 56,
									"dislikes": 0
									}]
						},
						{"user": 0,
						"title": "hey guys",
						"date": "2017-11-12 10:11",
						"text": "hey guys im new",
						"likes": 2,
						"dislikes": 0,
						"comments": [
									{"user": 4,
									"date": "2017-11-12 11:15",
									"text": "hi new, im dad",
									"likes": 1,
									"dislikes": 0
									}]
						}]
			},
			{"title": "Fifty Shades Darker",
			"isShow": false,
			"year": 2017,
			"poster": "https://walter.trakt.tv/images/movies/000/222/332/posters/thumb/5efccbca57.jpg",
			"rating": 3.4,
			"subscribers": 58920,
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
			},
			{
				"title": "The Simpsons",
				"isShow": true,
				"year": 1989,
				"poster": "https://walter.trakt.tv/images/shows/000/000/455/posters/thumb/8b737766ea.jpg",
				"rating": 4.5,
				"subscribers": 1056308,
				"airs": "Mondays at 1AM",
				"network": "FOX",
				"language": "English",
				"genres": ["Animation","Comedy"],
				"synopsis": "Set in Springfield, the average American town, the show focuses on the antics and everyday adventures of the Simpson family; Homer, Marge, Bart, Lisa and Maggie, as well as a virtual cast of thousands.",
				"seasons": [{
					"episodes": [{
						"title": "Simpsons Roasting on an Open Fire",
						"thumbnail": "https://walter.trakt.tv/images/episodes/000/025/734/screenshots/thumb/560b43bd81.jpg"
					}]
				}],
				"actors": [{"name": "Nancy Cartwright",
							"character": "Bart Simpson",
							"photo": "https://walter.trakt.tv/images/people/000/415/153/headshots/thumb/311c8d7b38.jpg",
							"imdb": "http://www.imdb.com/name/nm0004813"
							},
							{"name": "Dan Castellaneta",
										"character": "Homer Simpson",
										"photo": "https://walter.trakt.tv/images/people/000/410/980/headshots/thumb/7fcdac59ca.jpg",
										"imdb": "http://www.imdb.com/name/nm0144657"
							},
							{"name": "Julie Kavner",
										"character": "Marge Simpson",
										"photo": "https://walter.trakt.tv/images/people/000/417/696/headshots/thumb/10b29beab6.jpg",
										"imdb": "http://www.imdb.com/name/nm0001413"
							},
							{"name": "Yeardley Smith",
										"character": "Lisa Simpson",
										"photo": "https://walter.trakt.tv/images/people/000/418/077/headshots/thumb/9eee2c2a02.jpg",
										"imdb": "http://www.imdb.com/name/nm0810379"
							},
							{"name": "Harry Shearer",
										"character": "Mr. Burns / Principal Skinner",
										"photo": "https://walter.trakt.tv/images/people/000/411/726/headshots/thumb/1a5bf66e67.jpg",
										"imdb": "http://www.imdb.com/name/nm0790434"
							}],
				"reviews": [{"user": 1,
							"rating": 5,
							"date": "2017-06-10 18:30",
							"text": "love it",
							"likes": 500,
							"dislikes": 1
				}],
				"posts": [{"user": 0,
							"title": "conspiracy theory",
							"date": "2017-11-13 23:41",
							"text": "what if... the simpsons are actually part of the illuminati?????",
							"likes": 5,
							"dislikes": 3,
							"comments": [{"user": 3,
										"date": "2017-11-14 00:22",
										"text": "what the fuck",
										"likes": 1,
										"dislikes": 0
							}]
				}]
			}];
}

/* Users */
function saveUsers(){
	localStorage["users"] = JSON.stringify(users);
}
function loadUsers(){
	users = JSON.parse(localStorage["users"]);
}

/* Contents */
function saveContents(){
	localStorage["contents"] = JSON.stringify(contents);
}
function loadContents(){
	contents = JSON.parse(localStorage["contents"]);
}

/* Check if we can load from localStorage or if we need to use the default values */
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