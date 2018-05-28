// https://github.com/expressjs/express
const routes = require('express').Router()
// https://github.com/jaredhanson/passport
const passport = require('passport')
const create = require('./create')
const single = require('./single')

routes.post('/', create)
routes.get('/', passport.authenticate('jwt', {
    session: false
}), single)

module.exports = routes
