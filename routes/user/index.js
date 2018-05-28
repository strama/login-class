// https://github.com/expressjs/express
const routes = require('express').Router()
const create = require('./create')
const all = require('./all')
const single = require('./single')
const update = require('./update')
const remove = require('./delete')

routes.post('/', create)
routes.get('/', all)
routes.get('/:id', single)
routes.put('/', update)
routes.delete('/', remove)

module.exports = routes
