// https://github.com/expressjs/express
const router = require('express').Router()
// Mongoose model
const User = require('../../databases/models/user')

module.exports = (req, res) => {
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
}
