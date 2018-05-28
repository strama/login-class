// https://github.com/expressjs/express
const routes = require('express').Router()

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected' })
});

const auth = require('./auth/index')
routes.use('/auth', auth)

const user = require('./user/index')
routes.use('/user', user)

module.exports = routes
