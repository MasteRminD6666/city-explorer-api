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
server.get('/movies',getMoives)
        
        
        
        
        
  
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
// https://api.themoviedb.org/3/movie/550?api_key=a715cc8a3e6c96dac242352c09885fa5MoiveKey&city=Amman

function getMoives(request,res){
    let cityName = request.query.city;
    const moviesUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${MoiveKey}`;
    // https://api.themoviedb.org/3/movie/550?city=Amman

    axios
    .get(moviesUrl)
    .then(moviesResult=>{
    
        let moviesArray=moviesResult.data.results.map(movie=>{
            return new Moives(movie)
        })
        res.send(moviesArray)
    })

    
    .catch(err => {
        console.log('error');
    })

}
    
function Moives(movie){
this.title = movie.original_title
this.overview =movie.overview
this.average_votes =movie.vote_average
this.total_votes =movie.vote_count
this.image_url =movie.backdrop_path
this.popularity =movie.popularity
this.released_on =movie.release_date
}     
    
server.get('*',(req,res) => {
  res.status(404).send({
      code: 404,
      message: 'Not Found'
  })
})