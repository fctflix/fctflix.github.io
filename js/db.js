/* Who needs servers and databases when you can just fake it with a little bit of JS witchcraft!

> shows[0].seasons[2].episodes[1].title
< "Rickmancing the Stone"

> shows[0].actors[2].character
< "Beth Smith"

> shows[0].reviews[2].text
< "Bland show for neckbeards!"

> document.getElementById("overlay").style.background = "url('"+users[shows[0].reviews[1].user].avatar+"')"
< "url('https://img1.etsystatic.com/041/1/5493921/il_340x270.572585825_n5px.jpg')"

*/



var users = [];
users.push({"name": "Doggo",
			"avatar": "./images/default_avatar.jpg"
			});
users.push({"name": "JamesDoe",
			"avatar": "https://i.imgur.com/TdYZdrY.jpg"
			});
users.push({"name": "SchrondingerFedora",
			"avatar": "https://img1.etsystatic.com/041/1/5493921/il_340x270.572585825_n5px.jpg"
			});
users.push({"name": "PeteTheFrog",
			"avatar": "http://dazedimg.dazedgroup.netdna-cdn.com/786/azure/dazed-prod/1140/3/1143350.jpg"
			});

var shows = [];
shows.push({"title": "Rick and Morty",
			"poster": "https://walter.trakt.tv/images/shows/000/069/829/posters/thumb/16434b4797.jpg",
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
						"photo": "https://walter.trakt.tv/images/people/000/471/529/headshots/thumb/fe304eb105.jpg"
						},
						{"name": "Chris Parnell",
						"character": "Jerry Smith",
						"photo": "https://walter.trakt.tv/images/people/000/421/126/headshots/thumb/dfe58f45de.jpg"
						},
						{"name": "Sarah Chalke",
						"character": "Beth Smith",
						"photo": "https://walter.trakt.tv/images/people/000/428/041/headshots/thumb/65a865ff57.jpg"
						},
						{"name": "Spencer Grammer",
						"character": "Summer Smith",
						"photo": "https://walter.trakt.tv/images/people/000/434/202/headshots/thumb/45d54aec34.jpg"
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
						}]
			});