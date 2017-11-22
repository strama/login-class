// https://github.com/expressjs/express
const express = require('express');
// https://github.com/Automattic/mongoose
const mongoose = require('mongoose');
// https://github.com/motdotla/dotenv
const dotenv = require('dotenv').load();
// https://github.com/expressjs/body-parser
const bodyParser = require('body-parser');
// https://github.com/jaredhanson/passport
const passport = require('passport');
// https://github.com/themikenicholson/passport-jwt
const passportJwt = require('passport-jwt');

/**
 * Mongo & Mongoose config
 */
mongoose.connect(process.env.MONGODB, {
    useMongoClient: true
});
mongoose.connection.once('Connection error', console.error);

/**
 * Express
 */
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

const user = require('./routes/user');
app.use('/api/user', user);

/**
 * Passport authentication
 */
let options = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeader(),
    secretOrKey: 'FIAPClassAuth'
};

passport.use(new passportJwt.Strategy(options, (jwt_payload, done) => {
    const User = schemas.user;
    User.findById(jwt_payload._doc._id, (err, user) => {
        if (err) return done(err, false);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

/**
 * Server config
 */
const port = process.env.PORT || 8080;
const host = '0.0.0.0';

app.listen(port, host, () => {
    console.log(`FIAP Class server is up running at ${host}:${port}`);
});