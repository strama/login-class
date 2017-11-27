// https://github.com/dcodeIO/bcrypt.js
const bcrypt = require('bcryptjs');
// https://github.com/expressjs/express
const express = require('express');
// https://github.com/auth0/node-jsonwebtoken
const jwt = require('jsonwebtoken');
// https://github.com/jaredhanson/passport
const passport = require('passport');
// Model
const User = require('../models/user');
// Router
const router = express.Router();

router.post('/register', (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const lastName = req.body.last_name;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) return res.json({
                success: false,
                message: err
            });
            const password = hash;

            if (!email)
                return res.json({
                    success: false,
                    message: 'E-mail was not provided'
                });

            if (!password)
                return res.json({
                    success: false,
                    message: 'Password was not provided'
                });

            if (!name)
                return res.json({
                    success: false,
                    message: 'Name was not provided'
                });

            if (!lastName)
                return res.json({
                    success: false,
                    message: 'Last name was not provided'
                });

            const query = {
                email: email
            };
            User.findOne(query, (err, result) => {
                if (err) return res.json({
                    success: false,
                    message: err
                });

                if (!result) {
                    var user = new User();
                    user.email = email;
                    user.password = password;
                    user.name = name;
                    user.last_name = lastName;
                    user.save(err => {
                        if (err) return res.json({
                            success: false,
                            message: 'Failed to register a new user'
                        });
                        return res.json({
                            success: true,
                            message: 'Ok'
                        });
                    });
                } else {
                    return res.json({
                        success: false,
                        message: 'E-mail already in use'
                    })
                }
            });
        });
    });
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email)
        return res.json({
            success: false,
            message: 'E-mail was not provided'
        });

    if (!password)
        return res.json({
            success: false,
            message: 'Password was not provided'
        });

    const query = {
        email: email
    };
    User.findOne(query, (err, result) => {
        if (err) return res.json({
            success: false,
            message: err
        });

        if (!result)
            return res.json({
                success: false,
                message: 'User was not found'
            });

        bcrypt.compare(password, result.password, (err, isMatch) => {
            if (err) return res.json({
                success: false,
                message: err
            });

            if (isMatch) {
                const token = jwt.sign(result, 'LOGIN_CLASS_SERVICE_APPLICATION', {
                    expiresIn: 604800 // 1 week
                });
                return res.json({
                    success: true,
                    message: 'Ok',
                    token: 'JWT ' + token,
                    user: {
                        _id: result._id,
                        email: result.email,
                        name: result.name,
                        last_name: result.last_name
                    }
                });
            } else {
                return res.json({
                    success: false,
                    message: 'Password provided is wrong'
                })
            }
        });

    });
});

router.get('/login', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    return res.json({
        success: true,
        message: 'Ok',
        user: {
            _id: req.user._id,
            email: req.user.email,
            name: req.user.name,
            last_name: req.user.last_name
        }
    });
});

module.exports = router;