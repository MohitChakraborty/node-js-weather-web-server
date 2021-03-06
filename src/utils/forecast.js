const request = require('request');

const forecast = (latitude,longitutde, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=56ce467b6b3cc7dda7a1058f2646a4ef&query='+ encodeURIComponent(latitude)+','+encodeURIComponent(longitutde)+'&units=m';

    request({url, json: true}, (error,{body})=>{
        if(error)
        {
           callback('Unable to access weather info!', undefined);
        }
        else if(body.error)
        {
            callback('Unable to access location. Please try another location.', undefined);
        }
        else
        {
            var temp = body.current.temperature;
            var feelsLike = body.current.feelslike;
        
            callback(undefined,`${body.current.weather_descriptions[0]}. The temperature is ${temp} degree celsius, but it feels like ${feelsLike} degree celsius outside. The humidity is ${body.current.humidity}% and the visibility is ${body.current.visibility}. `)
        }
    })
};

module.exports = forecast;