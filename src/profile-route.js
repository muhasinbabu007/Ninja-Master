const profiles = require('express').Router()
let axios = require('axios')

axios = axios.create({
  baseURL: process.env.PROFILE_URL
})

profiles.post('/', async (req, res, next) => {
  axios.post('/profiles', req.body)
    .then(profile => {

    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      })
    })
})

profiles.get('/:id', async (req, res, next) => {
  axios.get(`/profiles/${req.params.id}`)
    .then(profile => {
      res.status(200).json(profile)
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      })
    })
})

profiles.put('/:id', async (req, res, next) => {
  axios.put(`/profiles/${req.params.id}`, req.body)
    .then(updatedProfile => {
      res.status(200).json(updatedProfile)
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      })
    })
})

module.exports = profiles
