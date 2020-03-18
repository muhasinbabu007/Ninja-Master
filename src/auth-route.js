const auth = require('express').Router()
const uRepo = require('./user-repo')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

auth.post('/', (req, res, next) => {
  // find the user
  uRepo.findUser(req.body.email)
    .then(user => {
    // validate password
      if (!user) {
        throw new Error('Invalid credentials')
      }
      bcrypt.compare(req.body.password, user.password)
        .then(hashMatches => {
        // create json web token
          if (!hashMatches) {
            throw new Error('Invalid credentials')
          }
          res.status(200).json({
            jwt: jwt.sign(user, process.env.JWT_SECRET)
          })
        })
        .catch(err => {
          res.status(400).json({
            message: err.message
          })
        })
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      })
    })
})

auth.put('/', (req, res, next) => {

})

module.exports = auth
