var pageUrl = window.location.href

const parseParams = (querystring) => {
    
    // parse query string
    const params = new URLSearchParams(querystring);
    
    const obj = {};
    
    // iterate over all keys
    for (const key of params.keys()) {
        if (params.getAll(key).length > 1) {
            obj[key] = params.getAll(key);
        } else {
            obj[key] = params.get(key);
        }
    }

    return obj;
};

var gameInfo = parseParams(pageUrl);

var slug = gameInfo["http://127.0.0.1:5501/gameInfoPlaceholder.html?slug"]
gameInfo = null

//---------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------

function Get(url){
    var req = new XMLHttpRequest()

    req.open("GET", url, false)
    req.send(null)

    if(req.status === 200){
        return req.responseText
    }
}

var url = `https://api.rawg.io/api/games/${slug}`

gameInfo = JSON.parse(Get(url))

var gameName = document.getElementById('gameName')
var gameScreenshot = document.getElementById('gameScreenshot')
var gameDescription = document.getElementById('gameDescription')

gameName.innerHTML = gameInfo.name
gameScreenshot.src = gameInfo.background_image
gameDescription.innerHTML = gameInfo.description