'use strict';
//Global
const express = require('express');
const server = express();
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT;
const getWeather= require("./weather/weather")
const getMoives= require("./movies/movies")
server.use(cors());


server.listen(PORT, () => {
    console.log(`Working ${PORT}`);
    })

server.get('/movies',getMoives)
server.get('/weather',getWeather)        
            
server.get('*',(req,res) => {
  res.status(404).send({
      code: 404,
      message: 'Not Found'
  })
})