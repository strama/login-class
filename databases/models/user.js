// https://github.com/Automattic/mongoose
const mongoose = require('mongoose')

var schema = mongoose.Schema

var userSchema = new schema({
    email: {
        type: String,
        required: 'E-mail was not provided.',
        unique: true
    },
    name: {
        type: String,
        required: 'Your name was not provided.'
    },
    last_name: {
        type: String,
        required: 'Your last name was not provided.'
    },
    password: {
        type: String,
        required: 'Password was not provided.'
    }
})

module.exports = mongoose.model('User', userSchema)
