const express = require('express')
require('dotenv').config()
const app = express()
const userRoute = require('./user-route')
const authRoute = require('./auth-route')
const noteRoute = require('./note-route')
const profileRoute = require('./profile-route')
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

app.use(express.json())
app.use(passport.initialize())

passport.use('jwt', new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, (payload, done) => {
  return done(null, payload)
}))

// logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} ${new Date().toLocaleString()}`)
  next()
})

app.use('/users', userRoute)
app.use('/auth', authRoute)
app.use('/notes', noteRoute)
app.use('/profiles', profileRoute)

app.listen(process.env.PORT, process.env.HOST, () => {
  console.info(
    `server listening on http://${process.env.HOST}:${process.env.PORT}`
  )
})
