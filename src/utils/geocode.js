const request = require('request')

const geocode = (address,callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoieWFzaGFzeWEiLCJhIjoiY2s4OG9yY3kxMGE5eTN1bXF2YXRrazc4aSJ9.bNr5reXZJni5jRx-ExDAOg&limit=1"

    request({url, json: true},(err,{body})=>{
        if(err){
            callback("unable to connect to the server",undefined) 
        }else if(body.features.length === 0){
             callback("Unable to find location, Try another search")
        }else{
            callback(undefined,{
                longitute:  body.features[0].center[0],
                latitute: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    
    })    
}

module.exports = geocode