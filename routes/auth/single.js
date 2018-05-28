// https://github.com/expressjs/express
const express = require('express').Router()

module.exports = (req, res) => {
    return res.json({
        success: true,
        message: 'Ok',
        user: {
            _id: req.user._id,
            email: req.user.email,
            name: req.user.name,
            last_name: req.user.last_name
        }
    })
}
