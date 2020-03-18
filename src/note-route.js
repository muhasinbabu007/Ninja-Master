const note = require('express').Router()
const axios = require('axios')
const passport = require('passport')

axios.defaults.baseURL = process.env.NOTES_BASEURL

note.get('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  axios.get(`/notes/${req.params.id}`)
    .then(response => {
      res.status(200).json(response.data)
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      })
    })
})

note.post('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  axios.post('/notes', {
    userId: req.user.id,
    userProfileId: 0,
    noteText: req.body.noteText
  })
    .then(response => {
      res.status(201).json(response.data)
    })
    .catch(error => {
      res.status(500).json({ message: error.message })
    })
})

note.put('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  axios.put(`/notes/${req.params.id}`, {
    noteText: req.body.noteText,
    userProfileId: 0,
    userId: req.user.id
  })
    .then(response => {
      res.status(200).json(response.data)
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      })
    })
})

note.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  axios.delete(`/notes/${req.params.id}`)
    .then(respnse => {
      res.status(204)
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      })
    })
})

module.exports = note
