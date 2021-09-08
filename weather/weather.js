const express = require('express');
const server = express();
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
const PORT = process.env.PORT;
const weatherKey= process.env.weather_api_Key;

server.use(cors());


function getWeather(request,res){
    let cityName = request.query.city;
    let lat =request.query.lat;
    let lon = request.query.long;
    const weatherUrl = `https://api.weatherbit.io/v2.0/current?city=${cityName}&key=${weatherKey}&lat=${lat}&lon=${lon}` // for the weather Api
    // const staticTest =  'https://api.weatherbit.io/v2.0/current?city=Amman&key=168d610fd998433db367d495f37fd06a&lat=31.9515694&lon=35.9239625'
    axios
    .get(weatherUrl)
    .then(weatherResult=>{
       let citycollection = weatherResult.data.data.map((item) => {
            
            return new Weather(item)
    })
    res.send(citycollection)
       
    //    console.log(weatherResult.data);
    //    return collect2.push(weatherResult.data)

    })
    
    .catch(err => {
        console.log('error');
    })
    
    
}
function Weather(item){
    this.datetime= item.datetime
    this.timezone=item.timezone
    this.country_code=item.country_code
    this.wind_cdir=item.wind_cdir
    this.description = `Low of ${item.vis} high of ${item.temp} with${item.weather.description}`
}  


module.exports =getWeather; 