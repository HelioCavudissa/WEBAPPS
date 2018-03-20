'use strict'

const Movie = require('../model/Movie')


module.exports = management

function management() {
    let req
    let createdMovies = []

    let key = require('fs').readFileSync('./api_key.txt')
    req = require('request')
        
    const services = {
  
    }
    return services


    
    function createMovie(id,cb){
        let moviePath=`https://api.themoviedb.org/3/movie/${id}?api_key=${key}`

        if(createMovie[id]){
            cb(createMovie[id])
            return
          }
        req(moviePath, (err, movie) =>{
          if(err) return cb(err)
        const obj = JSON.parse(movie.toString())
          createMovie[id]={
            'title': obj.title,
            'duration':obj.runtime,
            'release':obj.release_date,
            'id':id
          } 
          let movieObj = new Movie(obj,id) 
          cb(movieObj)
      }  )
   }

   function createSession(movieId,releaseInCimena,room,cb){
       createMovie(movieId,(err, movie) =>{
          if(err) return cb(err)
          let sessionObj = new Session( movie,releaseInCimena,room)
          cb(sessionObj)
       })
   }


   function createRoom(name,numberOfRows,numberOfseatsByRows,cb){
  
      let room =new  Room(name,numberOfRows,numberOfseatsByRows)
       return room;
   }

   function createCinema(name,city,rooms,cb){
       let cinema = new Cinema(name,city, rooms)
       return cinema;

   }
    function getMovie(id, cb) {
        const movieDetailsPath = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}`
        const creditsListPath = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${key}`
        reqParallel([movieDetailsPath, creditsListPath], (err, data) => {
            if(err) return cb(err)
            let cast = data[1].cast.map(e => new CastItem(e))
            let director = ''
            if((director = data[1].crew.find(c => c.department == 'Directing')) != undefined)
                director = director.name
            let result = new MovieDetails(data[0], cast, director)
            cb(null, result)
        })
    }

        function reqAsJson(path,cb) {
        req(path, (err, res, data) => {
            if(err) return cb(err)
            const obj = JSON.parse(data.toString())
            cb(null, obj)
        })
    }

    function reqParallel(urls, cb) {
        let data = []
        let count = 0

        for(let idx in urls) {
            reqAsJson(urls[idx], (err, obj) => {
                if(err) return cb(err)
                data[idx] = obj
                count++
                if(count == urls.length)
                    cb(null, data)
            })
        }
    }


   
}