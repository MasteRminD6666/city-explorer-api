'use strict';
const express = require('express');
const cors = require('cors');
const server = express();
server.use(cors());
require('dotenv').config();
const weatherData = require('./post/weather.json');
const PORT = process.env.PORT;


server.listen(PORT, () => {
console.log(`Working ${PORT}`);
})

class Weather {
    constructor(date, description,wind) {
        this.date = date;
        this.description = description;
        this.wind=wind
    }
}
// localhost:3000/weather?cityName=Amman&lat=31.9515694&lon=35.9239625
// checked the calss from malak code and i got the idea then i re write it thats a small note 
server.get('/weather', (request, res) => {
    let cityName = request.query.cityName;
    let lat =request.query.lat;
    let lon = request.query.long;
    let date;
    let description;
    let weatherPost;
    let wind; 
    let JsonData = weatherData.find((element) =>element)
    
    let postArray = [];
    for(let i=0;i<JsonData.data.length;i++){
        wind = JsonData.data[i].wind_cdir;
        date = JsonData.data[i].valid_date;
        description=JsonData.data[i].weather.description;
        weatherPost = new Weather(date,description,wind);
        postArray.push(weatherPost);
    }
    res.send(JsonData.data.city_name);
    
    res.send(postArray);
       
   
})
