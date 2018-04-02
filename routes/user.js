// https://github.com/dcodeIO/bcrypt.js
const bcrypt = require('bcryptjs')
// https://github.com/expressjs/express
const express = require('express')
const router = express.Router()
// https://github.com/auth0/node-jsonwebtoken
const jwt = require('jsonwebtoken')
// Model
const User = require('../models/user')

router.post('/user', (req, res) => {
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
})

router.get('/users', (req, res) => {
    User.find({}, '-password', (err, result) => {
        if (err) return res.json({
            success: false,
            message: err
        })

        if (!result)
            return res.json({
                success: false,
                message: 'There is no user registered. You can check later again'
            })

        return res.json({
            success: true,
            message: 'Ok',
            user: result
        })
    })
})

router.get('/users/:id', (req, res) => {
    User.findById(req.params.id, (err, result) => {
        if (err) return res.json({
            success: false,
            message: err
        })

        if (!result)
            return res.json({
                success: false,
                message: 'User was not found'
            })

        return res.json({
            success: true,
            message: 'Ok',
            user: result
        })
    })
})

router.delete('/users/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, result) => {
        if (err) return res.json({
            success: false,
            message: err
        })

        if (!result)
            return res.json({
                success: false,
                message: 'Failed to delete this user'
            })

        return res.json({
            success: true,
            message: 'Ok'
        })
    })
})

router.put('/users/:id', (req, res) => {
    const _id = req.params.id
    if (!_id)
        return res.json({
            success: false,
            message: 'Id was not provided'
        })

    var user = {}

    if (req.body.email)
        user.email = req.body.email

    if (req.body.name)
        user.name = req.body.name

    if (req.body.last_name)
        user.last_name = req.body.last_name

    if (req.body.password) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                user.password = hash
                User.findByIdAndUpdate(_id, user, (err, result) => {
                    if (err) return res.json({
                        success: false,
                        message: err
                    })

                    if (!result)
                        return res.json({
                            success: false,
                            message: 'Could not update the user'
                        })

                    return res.json({
                        success: true,
                        message: 'ok',
                        user: {
                            _id: user._id,
                            email: user.email,
                            name: user.name,
                            last_name: user.last_name
                        }
                    })
                })
            })
        })
    } else {
        User.findByIdAndUpdate(_id, user, (err, result) => {
            if (err) return res.json({
                success: false,
                message: err
            })

            if (!result)
                return res.json({
                    success: false,
                    message: 'Could not update the user'
                })

            return res.json({
                success: true,
                message: 'ok',
                user: {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    last_name: user.last_name
                }
            })
        })
    }
})

module.exports = router
