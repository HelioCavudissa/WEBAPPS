'use strict'

const Movie = require('../model/Movie')
const Cinema = require('../model/Cinema')
const CastItem = require('../model/CastItem')
const MovieDetails = require('../model/MovieDetails')
const Room = require('../model/Room')
const Session = require('../model/Session')



module.exports = management

function management() {
    let req
    let createdMovies = []
    let createdSessions = []
    let createdCinema =[ ]
    let sessionIds= 0;
    let cinemasIds= 0;

    let key = require('fs').readFileSync('./api_key.txt')
    req = require('request')
        
    const services = {
        createCinema,
        getCinemas,
        getCinema,
        createSession,
        updateSession,
        getSessions,
        getSessionsById,
        deleteSession,
        deleteSessionById,
        createRoom,
        getRoom,
        getRoomInSession
  
    }
    return services

//Movie Handling
    
    function createMovie(id,cb){
        let moviePath=`https://api.themoviedb.org/3/movie/${id}?api_key=${key}`

        if(createMovie[id]){
            cb(null,createMovie[id])
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
          cb(null,movieObj)
      }  )
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


// Cinema Handling

// create a new cinema 
   function createCinema(name,city,cb){
       cinemasIds++
       let cinema = new Cinema(name,city,cinemasIds)
       createdCinema[cinemasIds] ={
           "cinema":cinema,
           "rooms":[],
           "sessions":[],
           
       } 
      cb(null,cinema)

   }

//return all the cinema 
   function getCinemas(){
       return createdCinema
   }

//return  the cinema 
   function getCinema(cinemaId){
       return createdCinema[cinemaId]
   }


// Session Handling 

//create new session inside the cinema
   function createSession(cinemaId,movieId,releaseInCinema,room,cb){
      createMovie(movieId,(err, movie) =>{
          if(err) return cb(err)
          let sessionObj = new Session( movie,releaseInCinema,room,sessionIds)
          createdCinema[cinemaId].session[sessionIds]=sessionObj
          cb(null,sessionObj)
       })
   }

 // list all the sessions in the cinema  
   function getSessions(cinemaId){
       return createdCinema[cinemaId].sessions
   }

// get the session  in the cinema  
  function getSessionsById(cinemaId,id,cb){
       if(createdCinema[cinemaId].sessions[id])
           return cb(createdCinema[cinemaId].sessions[id])
       cb( new Error("Cant find Session"))
   }
// delete all the sessions in cinema
   function deleteSession(cinemaId){
      createdCinema[cinemaId].sessions.delete
   }
// delete the sessions in cinema   
   function deleteSessionById(cinemaId,id){
      createdCinema[cinemaId].sessions[id]=undefined
   }

// update the session
function updateSession(cinemaId,movieId,sessionId,releaseInCimena,room,cb){
       let movie = createdMovies[movieId]
       if(movie) {
             let newSession = new Session( movie,releaseInCimena,room,sessionId)
             createdCinema[cinemaId].sessions[sessionId]=newSession
             return  cb(null,newSession)
        }
        
      createMovie(movieId,(err, movie) =>{
          if(err) return cb(err)
          let newSession = new Session( movie,releaseInCimena,room,sessionId)
          createdCinema[cinemaId].sessions[sessionId]=newSession
          return  cb(null,newSession)
       })
   }


// create a room in cinema 
 function createRoom(cinemaId,name,numberOfRows,numberOfseatsByRows){
  
      let room =new  Room(name,numberOfRows,numberOfseatsByRows)
      createdCinema[cinemasId].rooms.push(room)

       return room;
   }

// list all the room in cinema   
function getRoom(cinemaId){
    return createdCinema[cinemaId].rooms
}

// list all the room in cinema   
function getRoomInSession(cinemaId,sessionId){
    return createdCinema[cinemaId].sessions[sessionId].room
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