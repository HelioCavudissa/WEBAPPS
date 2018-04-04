'use strict'
const express = require('express')
const router = express.Router()
const managmentService = require('../services/ManagementServices.js')
module.exports = router
const ms = managmentService()

router.get('/test', (req, res) => {

            res.json("test")
    })


//Cinema Router

router.post('/cinema',(req, res, next) => {
  ms.createCinema(req.body.cinemaName,req.body.cinemaCity,(err,session) =>{
       if(err) return next(err)
       res.json(session)
      })

})    

 router.get('/cinema', (req, res) => {
       let cinemas =ms.getCinemas()
            res.json(cinemas)
    })


 router.get('/cinema/:id', (req, res) => {
       let cinema =ms.getCinema(req.params.id)
            res.json(cinema)
    })

// Session Router    
router.post('/cinema/:id/session',(req, res, next) => {
  ms.createSession(req.params.movieId,req.body.movieId,req.body.date,req.body.room,(err,session) =>{
       if(err) return next(err)
       res.json(session)
      })

})

 router.get('/cinema/:id/session', (req, res) => {
       let sessions=ms.getSessions(req.params.id)
            res.json(sessions)
    })

 router.get('/cinema/:id/session/:cid', (req, res, next) => {
       ms.getSessionById(req.params.id,req.params.cid, (err,session) => {
         if(err)
            return res.json(err)
          res.json(session)
        })
    })


 router.delete('/cinema/:id/session', (req, res) => {
       let sessions=ms.deleteSession(req.params.id)
            res.json(sessions)
    })

  router.delete('/cinema/:id/session/:cid', (req, res) => {
       let sessions=ms.deleteSessionById(req.params.id,req.params.cid)
            res.json(sessions)
    })

router.put('/cinema/:id/session/:sessionId',(req, res, next) => {

  let room =  ms.createRoom(req.params.id,req.body.roomName,req.body.numberOfRows,req.body.numberOfseatsByRows)   
  ms.updateSession(req.params.id,req.body.movieId,req.params.sessionId,req.body.date,room,(err,session) =>{
       if(err) return next(err)
       res.json(session)
      })

})

// Room Router


router.post('/cinema/:id',(req, res, next) => {
  let room =  ms.createRoom(req.params.id,req.body.roomName,req.body.numberOfRows,req.body.numberOfseatsByRows)   
 
       res.json(room)
})    


 router.get('/cinema/:id', (req, res) => {
       let room =ms.getRoom(req.params.id)
            res.json(cinemas)
    })

 router.get('/cinema/:id/session/sessionId', (req, res) => {
       let room =ms.getRoomInSession(req.params.id,req.params.sessionId)
            res.json(cinemas)
    })


