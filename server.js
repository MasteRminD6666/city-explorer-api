'use strict'; 
const express = require('express');
const cors = require('cors');
const server = express();
const weather = require('./post/weather.json');
server.use(cors())
const PORT = 3000;

server.get('/weather',(request,res) => {
    // const lat = request.query.lat
    // const lon = request.query.lon
    // const cityName= request.query.cityName
    // const sentData = weather.data
    let weatherData = weather.map((element,indx) => {
      return element["data"].rh
    })
  
    res.send(`this is with one loo ${weatherData}`)
    
    
})

server.listen(PORT,() => {
  console.log(`hello on ${PORT} `);
})