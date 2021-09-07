'use strict';
//Global
const express = require('express');
const server = express();
require('dotenv').config();
const cors = require('cors');
server.use(cors());
const axios = require('axios');
const PORT = process.env.PORT;
const weatherKey= process.env.Key;
const MoiveKey= process.env.movieKey;



    
server.listen(PORT, () => {
    console.log(`Working ${PORT}`);
    })


server.get('/weather',getWeather)
server.get('/moives',getMoives)
        
        
        
        
        
  
function getWeather(request,res){
    let cityName = request.query.city;
    let lat =request.query.lat;
    let lon = request.query.long;
    const weatherUrl = `https://api.weatherbit.io/v2.0/current?city=${cityName}&key=${weatherKey}` // for the weather Api
    // const staticTest =  'https://api.weatherbit.io/v2.0/current?city=Amman&key=168d610fd998433db367d495f37fd06a'
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
        err.status(404).send('error');
    })
    
    
}


function Weather(item){
    this.datetime= item.datetime
    this.timezone=item.timezone
    this.country_code=item.country_code
    this.wind_cdir=item.wind_cdir
    this.description = `Low of ${item.vis} high of ${item.temp} with${item.weather.description}`
}  
// https://api.themoviedb.org/3/movie/550?api_key=a715cc8a3e6c96dac242352c09885fa5MoiveKey&city=Amman

function getMoives(request,res){
    let cityName = request.query.city;
    const moivesUrl = `https://api.themoviedb.org/3/movie/550?api_key=${MoiveKey}&city=${cityName}`;
    const arryOfMoive = []
    axios
    .get(moivesUrl)
    .then(moivesResult=>{
        arryOfMoive.push(moivesResult.data)
        let postedMoives = arryOfMoive.map(moive=>{
            return new Moives(moive)
        })
        res.send(postedMoives)
    })

    
    .catch(err => {
        console.log('error');
    })

}
    
function Moives(moive){
this.title = moive.original_title
this.overview =moive.overview
this.average_votes =moive.vote_average
this.total_votes =moive.vote_count
this.image_url =moive.backdrop_path
this.popularity =moive.popularity
this.released_on =moive.release_date
}     
    
server.get('*',(req,res) => {
  res.status(404).send({
      code: 404,
      message: 'Not Found'
  })
})