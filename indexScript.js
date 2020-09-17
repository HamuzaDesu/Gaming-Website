function Get(url){
    var req = new XMLHttpRequest()

    req.open("GET", url, false)
    req.send(null)

    if(req.status === 200){
        return req.responseText
    }
}

// .
// .
// .
// .
//GAMESPOT
// var NEWSAPIKEY = '3e5d4427b82233974f452b8d3af8d5e017123fcf'
// var NEWSURL = `http://www.gamespot.com/api/articles/?api_key=${NEWSAPIKEY}&format=json`

// http://www.gamespot.com/api/articles/?api_key=3e5d4427b82233974f452b8d3af8d5e017123fcf&format=json&filter=name:portal-2
// https://www.gamespot.com/api/documentation/
// .
// .
// .
// .
// .

//CAROUSEL IMAGES
var games = ['portal-2', 'call-of-duty-modern-warfare', 'red-dead-redemption-2', 'marvels-avengers', 'cyberpunk-2077']

var randomNumber = Math.floor(Math.random() * games.length)
var url = `https://api.rawg.io/api/games/${games[randomNumber]}/screenshots`


var imagesObj = JSON.parse(Get(url))
var images = imagesObj.results

var carouselItems = document.querySelectorAll('.carouselImage')

for(let i = 0; i < carouselItems.length; i++){
    carouselItems[i].src = images[i].image
}

//CARD
var getGamesUrl = 'https://api.rawg.io/api/games'
var gamesObj = JSON.parse(Get(getGamesUrl))

var gameResults = gamesObj.results

var showedGames = []

var cards = document.querySelectorAll('div.col-lg-4.col-md-6 > .card')

for(let i = 0; i < cards.length; i++){
    //Gets card child elements
    var cardChildren = cards[i].children
    var cardImageTop = cardChildren[0]
    var cardBody = cardChildren[1]
    var cardBodyChildren = cardBody.children
    var cardTitle = cardBodyChildren[0]
    var cardText = cardBodyChildren[1]
    
    // Gets game info
    var random = Math.floor(Math.random() * gameResults.length)
    var index = random

    showedGames.push(gameResults[index])

    var gameName = gameResults[index].name
    var gameImageLink = gameResults[index]["background_image"]
    var gameRating = gameResults[index].rating
    var gamePlatforms = gameResults[index].platforms

    if(index > -1){
        gameResults.splice(index, 1)
    }

    var gamePlatformNames = []
    
    for(let i = 0; i < gamePlatforms.length; i++){
        gamePlatformNames.push(gamePlatforms[i].platform.name)
    }
    var gameNamesString = ""
    for(let i = 0; i < gamePlatformNames.length; i++){
        gameNamesString += `${gamePlatformNames[i]}, `
    }

    gameNamesString = gameNamesString.slice(0, -2)
    gameNamesString += '.'

    cardImageTop.src = gameImageLink


    cardTitle.innerHTML = gameName
    cardText.innerHTML = `Rating: ${gameRating}/5<br><br>Platforms: ${gameNamesString}` 
    // cardText.innerHTML = `${gamesInfo[i]}`
}
// TWITCH

// var twitchUrl = `https://api.rawg.io/api/games/${games[randomNumber]}/twitch`
// var twitchDiv = document.getElementById('twitch')

// console.log(twitchDiv)

// twitchObj = JSON.parse(Get(twitchUrl))

// console.log(twitchObj)

// twitchResults = twitchObj.results

// for(let i = 0; i < twitchResults.length; i++){
//     var div = document.createElement('div')
//     div.innerText = `Name: ${twitchResults[i].name}`
//     var img = document.createElement('img')
//     img.src = twitchResults[i].thumbnail
//     div.appendChild(img)

//     twitchDiv.appendChild(div)
// }

// var buttonTest = document.createElement('button')
// buttonTest.innerText = 'hello'
// twitchDiv.appendChild(buttonTest)

serialize = function(obj, prefix) {
    var str = [],
      p;
    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        var k = prefix ? prefix + "[" + p + "]" : p,
          v = obj[p];
        str.push((v !== null && typeof v === "object") ?
          serialize(v, k) :
          encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
    return str.join("&");
}

function onButtonClick(number){
    singleGame = showedGames[number]

    // var queryString = Object.keys(infoToSend).map(key => key + '=' + infoToSend[key]).join('&');

    var clickUrl = `gameInfoPlaceholder.html?slug=${singleGame.slug}`

    console.log(clickUrl)

    // console.log(queryString)
    location.href = clickUrl  
}