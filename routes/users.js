// https://github.com/dcodeIO/bcrypt.js
const bcrypt = require('bcryptjs');
// https://github.com/expressjs/express
const express = require('express');
// https://github.com/auth0/node-jsonwebtoken
const jwt = require('jsonwebtoken');
// Model
const User = require('../models/user');
// Router
const router = express.Router();

router.get('/user', (req, res) => {
    User.find({}, '-password', (err, result) => {
        if (err) return res.json({
            success: false,
            message: err
        });

        if (!result)
            return res.json({
                success: false,
                message: 'There is no user registered. You can check later again'
            });

        return res.json({
            success: true,
            message: 'Ok',
            user: result
        });
    });
});

router.get('/user/:id', (req, res) => {
    User.findById(req.params.id, (err, result) => {
        if (err) return res.json({
            success: false,
            message: err
        });

        if (!result)
            return res.json({
                success: false,
                message: 'User was not found'
            });

        return res.json({
            success: true,
            message: 'Ok',
            user: result
        });
    });
});

router.delete('/user/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, result) => {
        if (err) return res.json({
            success: false,
            message: err
        });

        if (!result)
            return res.json({
                success: false,
                message: 'Failed to delete this user'
            });

        return res.json({
            success: true,
            message: 'Ok'
        });
    });
});

router.put('/user', (req, res) => {
    const _id = req.body._id;
    if (!_id)
        return res.json({
            success: false,
            message: 'Id was not provided'
        });

    var user = {};

    if (req.body.email)
        user.email = req.body.email;

    if (req.body.name)
        user.name = req.body.name;

    if (req.body.last_name)
        user.last_name = req.body.last_name;

    if (req.body.password) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                user.password = hash;
                User.findByIdAndUpdate(_id, user, (err, result) => {
                    if (err) return res.json({
                        success: false,
                        message: err
                    });
            
                    if (!result)
                        return res.json({
                            success: false,
                            message: 'Could not update the user'
                        });
            
                    return res.json({
                        success: true,
                        message: 'ok',
                        user: {
                            _id: user._id,
                            email: user.email,
                            name: user.name,
                            last_name: user.last_name
                        }
                    });
                });
            });
        });
    } else {
        User.findByIdAndUpdate(_id, user, (err, result) => {
            if (err) return res.json({
                success: false,
                message: err
            });
    
            if (!result)
                return res.json({
                    success: false,
                    message: 'Could not update the user'
                });
    
            return res.json({
                success: true,
                message: 'ok',
                user: {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    last_name: user.last_name
                }
            });
        });
    }
});

module.exports = router;