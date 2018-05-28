// https://github.com/Automattic/mongoose
const mongoose = require('mongoose')

var schema = mongoose.Schema

var userSchema = new schema({
    email: String,
    name: String,
    last_name: String,
    password: String
})

module.exports = mongoose.model('User', userSchema)
