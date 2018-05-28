// https://github.com/Automattic/mongoose
const mongoose = require('mongoose')

// Set up Mongoose connection config
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))
mongoose.connection.once('open', () => {
    console.log('MongoDB connected')
})

module.exports = mongoose
