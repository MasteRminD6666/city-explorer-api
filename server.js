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

server.get('/weather', (request, res) => {
    let cityName = request.query.searchQuery;
    let lat =request.query.lat;
    let lon = request.query.long;
    let date;
    let description;
    let weatherPost;
    let wind; 
    let JsonData = weatherData.find((element) => element )
            
       let postArray = [];
        for(let i=0;i<JsonData.data.length;i++){
            wind = JsonData.data[i].wind_cdir;
            date = JsonData.data[i].valid_date;
            description=JsonData.data[i].weather.description;
            weatherPost = new Weather(date,description,wind);
            postArray.push(weatherPost);
        }
        
        res.send(postArray);
   
})
