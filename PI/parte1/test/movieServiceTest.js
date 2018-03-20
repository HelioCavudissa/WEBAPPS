'use strict'

const fs = require('fs')

let key = '7354c6448bfd6937cb4d030e975003f1'

const endpoints = {
    'https://api.themoviedb.org/3/search/movie?api_key=7354c6448bfd6937cb4d030e975003f1&query=it&page=1': 
        fs.readFileSync('./movieSearchIt.json').toString(),
    'https://api.themoviedb.org/3/movie/270303?api_key=7354c6448bfd6937cb4d030e975003f1':
        fs.readFileSync('./movieDetailsItFollows.json').toString(),
    'https://api.themoviedb.org/3/movie/270303/credits?api_key=7354c6448bfd6937cb4d030e975003f1':
        fs.readFileSync('./movieCreditsItFollows.json').toString(),
    'https://api.themoviedb.org/3/person/1094091?api_key=7354c6448bfd6937cb4d030e975003f1':
        fs.readFileSync('./actorDetailsMaikaMonroe.json').toString(),
    'https://api.themoviedb.org/3/person/1094091/movie_credits?api_key=7354c6448bfd6937cb4d030e975003f1':
        fs.readFileSync('./actorCreditsMaikaMonroe.json').toString(),
    'https://api.themoviedb.org/3/person/7404?api_key=7354c6448bfd6937cb4d030e975003f1':
        fs.readFileSync('./actorDetailsSarahSilverman.json').toString(),
    'https://api.themoviedb.org/3/person/7404/movie_credits?api_key=7354c6448bfd6937cb4d030e975003f1':
        fs.readFileSync('./actorCreditsSarahSilverman.json').toString()
}

const movie = require('./../movieService')(reqToFile)
let requestCounter = 0;

function reqToFile(path, cb) {
    requestCounter++;
    const data = endpoints[path]
    if(!data) return cb(new Error('No mock file for path ' + path))
    cb(null, null, data)
}

module.exports = {
    testSearchMovies,
    testGetMovie,
    testGetActor,
    testCache
}

function testSearchMovies(test) {
    movie.searchMovies('it', 1, (err, movies) => {
        if(err)
            test.ifError(err)
        else {
            test.equal(movies.results[0].title, 'It')
            test.equal(movies.results[2].title, 'It Follows')
        }
        test.done()
    })
}

function testGetMovie(test) {
    movie.getMovie(270303, (err, movie) => {
        if(err)
            test.ifError(err)
        else {
            test.equal(movie.original_title, 'It Follows')
            test.equal(movie.release_date, '2015-02-04')
            test.equal(movie.tagline, 'It doesn\'t think, it doesn\'t feel, it doesn\'t give up')
            test.equal(movie.credits[0].name, 'Maika Monroe')
            test.equal(movie.credits[0].character, 'Jay Height')
        }
        test.done()
    })
}

function testGetActor(test) {
    movie.getActor(1094091, (err, actor) => {
        if(err)
            test.ifError(err)
        else {
            test.equal(actor.name, 'Maika Monroe')
            test.equal(actor.cast[0].title, 'The Tribes of Palos Verdes')
            test.equal(actor.cast[1].release_date, '2017-03-25')
        }
        test.done()
    })
}

function testCache(test) {
    requestCounter = 0;
    movie.getActor(7404, (err, actor) => {
        if(err) test.ifError(err)
    })
    movie.getActor(7404, (err, actor) => {
        if(err)
            test.ifError(err)
        else {
            test.equal(requestCounter, 2)
        }
        test.done()
    })
}