// https://github.com/expressjs/express
const router = require('express').Router()
// Mongoose model
const User = require('../../databases/models/user')

module.exports = (req, res) => {
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
}
