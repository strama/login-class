// https://github.com/expressjs/express
const express = require('express')
// https://github.com/motdotla/dotenv
const dotenv = require('dotenv').load()
// https://github.com/expressjs/body-parser
const bodyParser = require('body-parser')
// https://github.com/jaredhanson/passport
const passport = require('passport')
// https://github.com/themikenicholson/passport-jwt
const passportJwt = require('passport-jwt')
// https://nodejs.org/api/path.html
const path = require('path')
// Get MongoDB config
const mongodb = require('./databases/mongodb')

// Set up Express.js
const app = express()
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())

const routes = require('./routes/index')
app.use('/api', routes)

// Passport authentication
let options = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeader(),
    secretOrKey: 'LOGIN_CLASS_SERVICE_APPLICATION_SECRET_OR_KEY'
}

passport.use(new passportJwt.Strategy(options, (jwt_payload, done) => {
    const User = require('./databases/models/user')
    User.findById(jwt_payload._doc._id, (err, user) => {
        if (err) return done(err, false)
        if (user) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    })
}))

// Server config
const host = process.env.HOST || '0.0.0.0',
    port = process.env.VCAP_APP_PORT || process.env.PORT || 3000

app.listen(port, host, () => {
    console.log(`Login Class server is up running at ${host}:${port}`)
})
