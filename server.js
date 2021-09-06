'use strict';
const express = require('express');
const cors = require('cors');
const server = express();
const weather = require('./post/weather.json');
require('dotenv').config();
server.use(cors())
const PORT = process.env.PORT;

server.get('/weather', (request, res) => {
  const cityName = request.query.cityName
  const lat = request.query.lat
  const lon = request.query.lon

  const postData = []
  let names = weather.map((element, indx) => {
    if (element.city_name === cityName) {
      postData.push(element["data"][indx].weather.description)
      postData.push(element["data"][indx].datetime)
      postData.push(element["data"][indx].wind_cdir)
    }


    return element

  })
  res.send(postData)



})
server.get('*', () => {

})
server.listen(PORT, () => {
  console.log(`hello on ${PORT} `);
})