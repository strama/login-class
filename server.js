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
// https://nodejs.org/api/path.html
const path = require('path');

/**
 * Mongo & Mongoose config
 */
mongoose.connect(process.env.MONGODB, {
    useMongoClient: true
});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => {
    console.log('MongoDB connected');
});
/**
 * Express
 */
const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

const user = require('./routes/users');
app.use('/api/users', user);

const auth = require('./routes/auth');
app.use('/api/auth', auth);

app.use(express.static(path.join('public', __dirname)));

/**
 * Passport authentication
 */
let options = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeader(),
    secretOrKey: 'LOGIN_CLASS_SERVICE_APPLICATION'
};

passport.use(new passportJwt.Strategy(options, (jwt_payload, done) => {
    const User = require('./models/user');
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
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => {
    console.log(`Login Class server is up running at ${host}:${port}`);
});