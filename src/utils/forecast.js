const request = require('request')

const forecast = (longitute,latitute,callback) => {
    const url = "https://api.darksky.net/forecast/e0beee7a9b95c456314b9f3b66f4a67d/"+ longitute +"," + latitute+ "?units=us"

    request({url, json: true},(err,{body}) =>{
        
        if(err){
            callback("unable to connect to the server")
        }
        else if(body.error){
            callback("invalid input")
        }
        else{
           callback(undefined,body.currently.summary +"It is currently " + body.currently.temperature+ " degrees out there. There is a " + body.currently.precipProbability*100 + "% chance of rain" )
        }
    })
}

module.exports = forecast