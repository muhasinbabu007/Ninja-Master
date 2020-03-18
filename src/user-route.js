const user = require('express').Router()
const validator = require('./user-validator')
const uRepo = require('./user-repo')
const passport = require('passport')

// errors
const sequelize = require('sequelize')

user.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  const user = await uRepo.findByPk(req.params.id)
  if (user) {
    res.status(200).json(user)
  } else {
    res.status(404).json({
      message: `No user found with id ${req.params.id}`
    })
  }
})

user.post('/', validator.create, async (req, res, next) => {
  uRepo.createUser(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      if (error instanceof sequelize.UniqueConstraintError) {
        res.status(400).json({
          message: 'email already registered'
        })
      } else {
        console.error(error)
        res.status(500).json({
          message: 'An internal error occured'
        })
      }
    })
})

user.put('/:id', (req, res, next) => {

})

module.exports = user
