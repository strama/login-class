// https://github.com/expressjs/express
const router = require('express').Router()
// Mongoose model
const User = require('../../databases/models/user')

module.exports = (req, res) => {
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
}
