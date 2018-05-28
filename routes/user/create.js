// https://github.com/dcodeIO/bcrypt.js
const bcrypt = require('bcryptjs')
// https://github.com/expressjs/express
const router = require('express').Router()
// https://github.com/auth0/node-jsonwebtoken
const jwt = require('jsonwebtoken')
// Mongoose model
const User = require('../../databases/models/user')

module.exports = (req, res) => {
    const email = req.body.email
    const name = req.body.name
    const lastName = req.body.last_name

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) return res.json({
                success: false,
                message: err.message
            })
            const password = hash

            if (!email)
                return res.json({
                    success: false,
                    message: 'E-mail was not provided'
                })

            if (!password)
                return res.json({
                    success: false,
                    message: 'Password was not provided'
                })

            if (!name)
                return res.json({
                    success: false,
                    message: 'Name was not provided'
                })

            if (!lastName)
                return res.json({
                    success: false,
                    message: 'Last name was not provided'
                })

            User.findOne({ email: email }, (err, result) => {
                if (err) return res.json({
                    success: false,
                    message: err.message
                })

                if (result) return res.json({
                    success: false,
                    message: 'E-mail already in use'
                })

                var user = new User()
                user.email = email
                user.password = password
                user.name = name
                user.last_name = lastName
                user.save(err => {
                    if (err) return res.json({
                        success: false,
                        message: 'Failed to register a new user'
                    })
                    return res.json({
                        success: true,
                        message: 'Ok'
                    })
                })
            })
        })
    })
}
