// https://github.com/expressjs/express
const router = require('express').Router()
// Mongoose model
const User = require('../../databases/models/user')

module.exports = (req, res) => {
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
}
