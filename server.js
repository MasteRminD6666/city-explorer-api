'use strict'; 
const express = require('express');
const cors = require('cors');
const server = express();
const weather = require('./post/weather.json');
require('dotenv').config();
server.use(cors())
const PORT = process.env.PORT;

server.get('/weather',(request,res) => {
    // const lat = request.query.lat
    // const lon = request.query.lon
    // const cityName= request.query.cityName
    // const sentData = weather.data
    const postData = []
    weather.forEach((element) => {
      postData.push(element.city_name)
      postData.push(element.lat)
      postData.push(element.lon)
      postData.push(element.timezone)
    })
   
  
    res.send(`this is with one loo ${postData}`)
   
    
    
})

server.listen(PORT,() => {
  console.log(`hello on ${PORT} `);
})