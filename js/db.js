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
			"avatar": "https://fctflix.github.io/images/db/0.jpg",
			"lists": [
						{
							"title": "Watchlist",
							"thumbnail": "https://fctflix.github.io/images/db/1.png",
							"contents": [1,2]
						},
						{
							"title": "pew pew pew",
							"thumbnail": "https://fctflix.github.io/images/db/2.jpg",
							"contents": [1,2]
						},
						{
							"title": "Shows with dogs in them",
							"thumbnail": "https://fctflix.github.io/images/db/3.jpg",
							"contents": [2,3]
						},
						{
							"title": "kinky",
							"thumbnail": "https://fctflix.github.io/images/db/4.jpg",
							"contents": [1]
						},
						{
							"title": "i dunno man",
							"thumbnail": "https://fctflix.github.io/images/db/5.jpg",
							"contents": [3]
						}],
			"subscriptions": [2,3],
			"notifications": [
								{
									"type":"new_episode",
									"showId":2
								},
								{
									"type":"post_reply",
									"showId":0,
									"postId":3
								}],
			"following": [1,2,3,4],
			"recommendedShow": 2,
			"history": [
				{"show":3,"season":0,"episode":0},
				{"show":1},
				{"show":0,"season":0,"episode":0},
				{"show":3,"season":0,"episode":1},
				{"show":2,"season":0,"episode":0}]
			},
			{"name": "JamesDoe",
			"avatar": "https://fctflix.github.io/images/db/6.jpg",
			"lists": [
						{
							"title": "Watchlist",
							"thumbnail": "https://fctflix.github.io/images/db/7.png",
							"contents": [0,1]
						}],
			"subscriptions": [0],
			"notifications": [],
			"following": [],
			"recommendedShow": 2,
			"history": []
			},
			{"name": "SchrondingerFedora",
			"avatar": "https://fctflix.github.io/images/db/8.jpg",
			"lists": [
						{
							"title": "Watchlist",
							"thumbnail": "https://fctflix.github.io/images/db/9.png",
							"contents": [0,1]
						}],
			"subscriptions": [0,1],
			"notifications": [],
			"following": [],
			"recommendedShow": 2,
			"history": []
			},
			{"name": "PeteTheFrog",
			"avatar": "https://fctflix.github.io/images/db/10.jpg",
			"lists": [
						{
							"title": "Watchlist",
							"thumbnail": "https://fctflix.github.io/images/db/11.png",
							"contents": [0,1]
						}],
			"subscriptions": [1],
			"notifications": [],
			"following": [],
			"recommendedShow": 2,
			"history": []
			},
			{"name": "Sethmore",
			"avatar": "https://fctflix.github.io/images/db/12.png",
			"lists": [
						{
							"title": "Watchlist",
							"thumbnail": "https://fctflix.github.io/images/db/13.png",
							"contents": [0,1]
						}],
			"subscriptions": [1],
			"notifications": [],
			"following": [],
			"recommendedShow": 2,
			"history": []
			},
			{"name": "where-is-bojack-horseman",
			"avatar": "https://fctflix.github.io/images/db/14.jpg",
			"lists": [
						{
							"title": "Watchlist",
							"thumbnail": "https://fctflix.github.io/images/db/15.png",
							"contents": [0,1]
						}],
			"subscriptions": [1],
			"notifications": [],
			"following": [],
			"recommendedShow": 2,
			"history": []
			}];
}
function defaultContents(){
	return [
			{"title": "Rick and Morty",
			"isShow": true,
			"year": 2013,
			"poster": "https://fctflix.github.io/images/db/16.jpg",
			"thumbnail": "https://fctflix.github.io/images/db/17.jpg",
			"rating": 4.7,
			"subscribers": 485001,
			"airs": "Mondays at 4:30AM",
			"network": "Adult Swim",
			"language": "English",
			"genres": ["Animation","Comedy","SciFi"],
			"synopsis": "A sociopathic scientist drags his unintelligent grandson on insanely dangerous adventures across the universe.",
			"seasons": [
						{"episodes":[
							{"title": "Pilot",
							"thumbnail": "https://fctflix.github.io/images/db/18.jpg"
							},
							{"title": "Lawnmower Dog",
							"thumbnail": "https://fctflix.github.io/images/db/19.jpg"
							}]
						},
						{"episodes":[
							{"title": "A Rickle in Time",
							"thumbnail": "https://fctflix.github.io/images/db/20.jpg"
							},
							{"title": "Mortynight Run",
							"thumbnail": "https://fctflix.github.io/images/db/21.jpg"
							}]
						},
						{"episodes":[
							{"title": "The Rickshank Rickdemption",
							"thumbnail": "https://fctflix.github.io/images/db/22.jpg"
							},
							{"title": "Rickmancing the Stone",
							"thumbnail": "https://fctflix.github.io/images/db/23.jpg"
							}]
						}],
			"actors": [
						{"name": "Justin Roiland",
						"character": "Rick Sanchez / Morty Smith",
						"photo": "https://fctflix.github.io/images/db/24.jpg",
						"imdb": "https://www.imdb.com/name/nm1551598/"
						},
						{"name": "Chris Parnell",
						"character": "Jerry Smith",
						"photo": "https://fctflix.github.io/images/db/25.jpg",
						"imdb": "https://www.imdb.com/name/nm0663177/"
						},
						{"name": "Sarah Chalke",
						"character": "Beth Smith",
						"photo": "https://fctflix.github.io/images/db/26.jpg",
						"imdb": "https://www.imdb.com/name/nm0149950/"
						},
						{"name": "Spencer Grammer",
						"character": "Summer Smith",
						"photo": "https://fctflix.github.io/images/db/27.jpg",
						"imdb": "https://www.imdb.com/name/nm0334561/"
						}],
			"reviews": [
						{"user": 1,
						"rating": 4,
						"date": "2017-09-21 07:40",
						"text": "A smart show that's constantly hilarious and packed with great characters. A must watch!",
						"likes": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92],
						"dislikes": [1, 2, 3, 4, 5, 6, 7, 8]
						},
						{"user": 2,
						"rating": 5,
						"date": "2017-03-02 17:42",
						"text": "To be fair, you have to have a very high IQ to understand Rick and Morty. The humour is extremely subtle, and without a solid grasp of theoretical physics most of the jokes will go over a typical viewer’s head. There’s also Rick’s nihilistic outlook, which is deftly woven into his characterisation- his personal philosophy draws heavily from Narodnaya Volya literature, for instance. The fans understand this stuff; they have the intellectual capacity to truly appreciate the depths of these jokes, to realise that they’re not just funny- they say something deep about LIFE. As a consequence people who dislike Rick & Morty truly ARE idiots- of course they wouldn’t appreciate, for instance, the humour in Rick’s existential catchphrase “Wubba Lubba Dub Dub,” which itself is a cryptic reference to Turgenev’s Russian epic Fathers and Sons. I’m smirking right now just imagining one of those addlepated simpletons scratching their heads in confusion as Dan Harmon’s genius wit unfolds itself on their television screens. What fools.. how I pity them. 😂 And yes, by the way, i DO have a Rick & Morty tattoo. And no, you cannot see it. It’s for the ladies’ eyes only- and even then they have to demonstrate that they’re within 5 IQ points of my own (preferably lower) beforehand. Nothin personnel kid 😎",
						"likes": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
						"dislikes": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
						},
						{"user": 3,
						"rating": 1,
						"date": "2017-04-20 02:57",
						"text": "Bland show for neckbeards!",
						"likes": [1],
						"dislikes": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
						}],
			"posts": [
						{"user": 3,
						"title": "WUBBA LUBBA DUB DUB",
						"date": "2017-08-20 02:57",
						"text": "And that's the way the news goes!https://fctflix.github.io/images/db/28.jpg",
						"likes": [1],
						"dislikes": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
						"comments": [
									{"user": 3,
									"date": "2017-08-20 02:58",
									"text": "I'M PICKLE RICK!",
									"likes": [1],
									"dislikes": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
									},
									{"user": 3,
									"date": "2017-08-20 02:59",
									"text": "TIME TO GET SCHWIFTY!",
									"likes": [1],
									"dislikes": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
									},
									{"user": 3,
									"date": "2017-08-20 03:00",
									"text": "wow u guys are really butthurt XD",
									"likes": [1],
									"dislikes": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
									}]
						},
						{"user": 2,
						"title": "the rick and morty copypasta but ran through google translate a few times",
						"date": "2017-11-10 05:31",
						"text": "We welcome IQ, Rick Morty to teach. The most humorous game and the typical audience in theoretical physics do not work solidly with subtlety. Fans. I realized that this is not only fun, but they must understand the power of deep intelligence games, but they say nothing is very important in life. As a result, people like to make Ricks really like, for example, when Russia's speech as epic poets for the new Rybakoven took a bad action \"VUB Lebanon is\" stupid and talented Dan Harmon because it is an imaginary addict that marks the confusion on your TV screen and scratches on your head and laughs now watching sons. Who's stupid to believe ... but not for them. News, yes by the way, I want Rick Morgan. You can not see women who are going to test for five years before IC (cheaper).",
						"likes": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
						"dislikes": [1, 2, 3, 4, 5, 6, 7],
						"comments": [
									{"user": 0,
									"date": "2017-11-10 12:01",
									"text": "why has no one commented yet? this is gret quality pasta",
									"likes": [],
									"dislikes": []
									}]
						},
						{"user": 2,
						"title": "the rick and morty copypasta but ran through google translate a few times",
						"date": "2017-11-10 17:31",
						"text": "We welcome IQ, Rick Morty to teach. The most humorous game and the typical audience in theoretical physics do not work solidly with subtlety. Fans. I realized that this is not only fun, but they must understand the power of deep intelligence games, but they say nothing is very important in life. As a result, people like to make Ricks really like, for example, when Russia's speech as epic poets for the new Rybakoven took a bad action \"VUB Lebanon is\" stupid and talented Dan Harmon because it is an imaginary addict that marks the confusion on your TV screen and scratches on your head and laughs now watching sons. Who's stupid to believe ... but not for them. News, yes by the way, I want Rick Morgan. You can not see women who are going to test for five years before IC (cheaper).",
						"likes": [1, 2, 3, 4],
						"dislikes": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
						"comments": [
									{"user": 1,
									"date": "2017-11-10 17:45",
									"text": "please dont repost this shit.",
									"likes": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
									"dislikes": []
									}]
						},
						{"user": 0,
						"title": "hey guys",
						"date": "2017-11-12 10:11",
						"text": "hey guys im new",
						"likes": [1, 2],
						"dislikes": [],
						"comments": [
									{"user": 4,
									"date": "2017-11-12 11:15",
									"text": "hi new, im dad",
									"likes": [1],
									"dislikes": []
									}]
						}]
			},
			{"title": "Fifty Shades Darker",
			"isShow": false,
			"year": 2017,
			"poster": "https://fctflix.github.io/images/db/29.jpg",
			"thumbnail": "https://fctflix.github.io/images/db/30.jpg",
			"rating": 4.7,
			"rating": 3.4,
			"subscribers": 58920,
			"released": "2017-02-10",
			"language": "English",
			"genres": ["Drama"],
			"synopsis": "When a wounded Christian Grey tries to entice a cautious Ana Steele back into his life, she demands a new arrangement before she will give him another chance. As the two begin to build trust and find stability, shadowy figures from Christian’s past start to circle the couple, determined to destroy their hopes for a future together.",
			"actors": [
						{"name": "Dakota Johnson",
						"character": "Anastasia Steele",
						"photo": "https://fctflix.github.io/images/db/31.jpg",
						"imdb": "https://www.imdb.com/name/nm0424848/"
						},
						{"name": "Jamie Dornan",
						"character": "Christian Grey",
						"photo": "https://fctflix.github.io/images/db/32.jpg",
						"imdb": "https://www.imdb.com/name/nm1946193/"
						}],
			"reviews": [
						{"user": 4,
						"rating": 3,
						"date": "2017-10-02 17:52",
						"text": "A review that doesn't say anything an interested viewer needs.",
						"likes": [1],
						"dislikes": []
						}],
			"posts": [
						{"user": 3,
						"title": "Still a better love story than Twilight",
						"date": "2017-08-25 03:57",
						"text": "see title",
						"likes": [1],
						"dislikes": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
						"comments": [
									{"user": 3,
									"date": "2017-08-25 06:18",
									"text": "why the downvotes?",
									"likes": [1],
									"dislikes": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
									}]
						}]
			},
			{
				"title": "The Simpsons",
				"isShow": true,
				"year": 1989,
				"poster": "https://fctflix.github.io/images/db/33.jpg",
				"thumbnail": "https://fctflix.github.io/images/db/34.jpg",
				"rating": 4.3,
				"subscribers": 1056308,
				"airs": "Mondays at 1AM",
				"network": "FOX",
				"language": "English",
				"genres": ["Animation","Comedy"],
				"synopsis": "Set in Springfield, the average American town, the show focuses on the antics and everyday adventures of the Simpson family; Homer, Marge, Bart, Lisa and Maggie, as well as a virtual cast of thousands.",
				"seasons": [{
					"episodes": [{
						"title": "Simpsons Roasting on an Open Fire",
						"thumbnail": "https://fctflix.github.io/images/db/35.jpg"
					}]
				}],
				"actors": [{"name": "Nancy Cartwright",
							"character": "Bart Simpson",
							"photo": "https://fctflix.github.io/images/db/36.jpg",
							"imdb": "http://www.imdb.com/name/nm0004813"
							},
							{"name": "Dan Castellaneta",
										"character": "Homer Simpson",
										"photo": "https://fctflix.github.io/images/db/37.jpg",
										"imdb": "http://www.imdb.com/name/nm0144657"
							},
							{"name": "Julie Kavner",
										"character": "Marge Simpson",
										"photo": "https://fctflix.github.io/images/db/38.jpg",
										"imdb": "http://www.imdb.com/name/nm0001413"
							},
							{"name": "Yeardley Smith",
										"character": "Lisa Simpson",
										"photo": "https://fctflix.github.io/images/db/39.jpg",
										"imdb": "http://www.imdb.com/name/nm0810379"
							},
							{"name": "Harry Shearer",
										"character": "Mr. Burns / Principal Skinner",
										"photo": "https://fctflix.github.io/images/db/40.jpg",
										"imdb": "http://www.imdb.com/name/nm0790434"
							}],
				"reviews": [{"user": 1,
							"rating": 5,
							"date": "2017-06-10 18:30",
							"text": "love it",
							"likes": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43],
							"dislikes": [1]
				}],
				"posts": [{"user": 0,
							"title": "conspiracy theory",
							"date": "2017-11-13 23:41",
							"text": "what if... the simpsons are actually part of the illuminati?????",
							"likes": [1, 2, 3, 4, 5],
							"dislikes": [1, 2, 3],
							"comments": [{"user": 3,
										"date": "2017-11-14 00:22",
										"text": "what the fuck",
										"likes": [1],
										"dislikes": []
							}]
				}]
			},
			{"title": "Mr. Robot",
			"isShow": true,
			"year": 2015,
			"poster": "https://fctflix.github.io/images/db/41.jpg",
			"thumbnail": "https://fctflix.github.io/images/db/42.jpg",
			"rating": 4.5,
			"subscribers": 264851,
			"airs": "Thursdays at 3:00AM",
			"network": "USA Network",
			"language": "English",
			"genres": ["Drama"],
			"synopsis": "Mr. Robot follows Elliot, a young programmer who works as a cyber-security engineer by day and a vigilante hacker by night. Elliot finds himself at a crossroads when the mysterious leader of an underground hacker group recruits him to destroy the corporation he is paid to protect.",
			"seasons": [
						{"episodes":[
							{"title": "eps1.0_hellofriend.mov",
							"thumbnail": "https://fctflix.github.io/images/db/43.jpg"
							},
							{"title": "eps1.1_ones-and-zer0es.mpeg",
							"thumbnail": "https://fctflix.github.io/images/db/44.jpg"
							}]
						},
						{"episodes":[
							{"title": "eps2.0_unm4sk-pt1.tc",
							"thumbnail": "https://fctflix.github.io/images/db/45.jpg"
							},
							{"title": "eps2.0_unm4sk-pt2.tc",
							"thumbnail": "https://fctflix.github.io/images/db/46.jpg"
							}]
						},
						{"episodes":[
							{"title": "eps3.0_power-saver-mode.h",
							"thumbnail": "https://fctflix.github.io/images/db/47.jpg"
							},
							{"title": "eps3.1_undo.gz",
							"thumbnail": "https://fctflix.github.io/images/db/48.jpg"
							}]
						}],
			"actors": [
						{"name": "Rami Malek",
						"character": "Elliot Alderson",
						"photo": "https://fctflix.github.io/images/db/49.jpg",
						"imdb": "http://www.imdb.com/name/nm1785339/"
						},
						{"name": "Christian Slater",
						"character": "Mr. Robot",
						"photo": "https://fctflix.github.io/images/db/50.jpg",
						"imdb": "http://www.imdb.com/name/nm0000225/"
						},
						{"name": "Portia Doubleday",
						"character": "Angela Moss",
						"photo": "https://fctflix.github.io/images/db/51.jpg",
						"imdb": "http://www.imdb.com/name/nm0234668/"
						},
						{"name": "Carly Chaikin",
						"character": "Darlene",
						"photo": "https://fctflix.github.io/images/db/52.jpg",
						"imdb": "http://www.imdb.com/name/nm3361199/"
						}],
			"reviews": [],
			"posts": [
						{"user": 3,
						"title": "DAE notice this?",
						"date": "2017-08-20 02:57",
						"text": "Is it just me or does Rami Malek look like a pepe?https://fctflix.github.io/images/db/53.jpg",
						"likes": [1],
						"dislikes": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
						"comments": [
									{"user": 4,
									"date": "2017-08-20 02:58",
									"text": "Could you just stop spamming everything?",
									"likes": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
									"dislikes": [1]
									},
									{"user": 3,
									"date": "2017-08-20 03:34",
									"text": "To be fair, you have to have a very high IQ to understand Mr Robot. The social commentary is extremely subtle, and without a solid grasp of Marxist philosophy most of the critique will go over a typical viewer’s head. There’s also Eliot’s nihilistic, alienated outlook, which is deftly woven into his characterisation- his personal philosophy draws heavily from Feuerbach, for instance. The fans understand this stuff; they have the intellectual capacity to truly appreciate the depths of the cinematography, to realise that they’re not just great shots- they draw upon a rich history of FILM. As a consequence people who dislike Mr Robot truly ARE idiots- of course they wouldn’t appreciate, for instance, the Philosophical humour in Eliot’s existential catchphrase “Please tell me you’re seeing this too,” which itself is a cryptic reference to David Fincher’s cinematic masterpiece “Fight Club” . I’m smirking right now just imagining one of those addlepated simpletons scratching their heads in confusion as Sam Esmail’s genius storytelling unfolds itself on their television screens. What fools.. how I pity them.<br>And yes, by the way, i DO have a Mr Robot tattoo. And no, you cannot see it. It’s for the ladies’ eyes only- and even then they have to demonstrate that they’re within 5 IQ points of my own (preferably lower) beforehand. Nothin personnel kid",
									"likes": [1, 2, 3],
									"dislikes": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
									}]
						},
						{"user": 2,
						"title": "Rami Malek winning Emmy reaction",
						"date": "2017-11-10 05:31",
						"text": "https://www.youtube.com/watch?v=-mJMNqNKfMI",
						"likes": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122],
						"dislikes": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
						"comments": [
									{"user": 1,
									"date": "2017-11-10 12:01",
									"text": "Congratulations Rami!",
									"likes": [1, 2],
									"dislikes": []
									},
									{"user": 3,
									"date": "2017-11-10 17:56",
									"text": "FAKE!!!1",
									"likes": [],
									"dislikes": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78]
									}]
						},
						{"user": 4,
						"title": "Here's a drawing of Elliot I made",
						"date": "2017-11-20 07:42",
						"text": "https://fctflix.github.io/images/db/54.jpg",
						"likes": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112],
						"dislikes": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
						"comments": [
									{"user": 1,
									"date": "2017-11-20 07:45",
									"text": "That's beautiful.",
									"likes": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
									"dislikes": []
									}]
						},
						{"user": 5,
						"title": "A theory about Elliot's routine",
						"date": "2017-11-15 23:14",
						"text": "Look I could write some text here but that's not the point. So I'll just go ahead and say random stuff. Or maybe not, who knows. Wait a minute, I just did it, din't I? Oh well...",
						"likes": [1, 2],
						"dislikes": [],
						"comments": [
									{"user": 4,
									"date": "2017-11-16 02:41",
									"text": "Interesting post...",
									"likes": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
									"dislikes": []
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