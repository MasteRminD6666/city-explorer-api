const express = require('express');
const server = express();
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
const MoiveKey = process.env.movieKey;
server.use(cors());


// https://api.themoviedb.org/3/movie/550?api_key=a715cc8a3e6c96dac242352c09885fa5MoiveKey&city=Amman
// here we can take the moives name but since we are not sending a name to the api we are mot going to use itbut here is the code 


function getMoives(request, res) {
    let movieName = request.query.moive;
    // let memory = {} // we declare an object this will contain all the arrays
// if (memory[movieName] !== undefined) {
//     res.send(memory[movieName]);
//   }
//   else{
// here we do the rest of the code
//   }
    const moviesUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${MoiveKey}`;
    // https://api.themoviedb.org/3/movie/550?moive=any_name
    axios
        .get(moviesUrl)
        .then(moviesResult => {
            let moviesArray = moviesResult.data.results.map(movie => {
                return new Moives(movie)
            })
            res.send(moviesArray)
        })

        .catch(err => {
            console.log('error');

        })





}

function Moives(movie) {
    this.title = movie.original_title
    this.overview = movie.overview
    this.average_votes = movie.vote_average
    this.total_votes = movie.vote_count
    this.image_url = movie.backdrop_path
    this.popularity = movie.popularity
    this.released_on = movie.release_date
}

module.exports = getMoives