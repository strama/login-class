// https://github.com/expressjs/express
const express = require('express');
// https://nodejs.org/api/http.html
const http = require('http');
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
// https://github.com/dcodeIO/bcrypt.js
const bcrypt = require('bcryptjs');

mongoose.connect(process.env.MONGODB, {
    useMongoClient: true
});
mongoose.connection.once('Connection error', console.error);

// Get all schemas
var schemas = {};
schemas.user = require(__dirname + '/models/user.js')(mongoose);

// Get all controllers
var controllers = {};
controllers.user = require(__dirname + '/controllers/user.js')(schemas, bcrypt);

// Get all routes
var routes = {};
routes.router = require(__dirname + '/router.js')(express, routes);

routes.routes = {};
routes.routes.user = require(__dirname + '/routes/user.js')(controllers.user, passport);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
routes.router(app);

const jwtStrategy = passportJwt.Strategy;
const extractJwt = passportJwt.ExtractJwt;
let options = {};
options.jwtFromRequest = extractJwt.fromAuthHeader();
options.secretOrKey = 'HAUHAUHAU';
passport.use(new jwtStrategy(options, (jwt_payload, done) => {
    const User = schemas.User;
    User.findOneById(jwt_payload._doc._id, (err, user) => {
        if (err) return done(err, false);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

return http.createServer(app).listen(process.env.PORT || 8080, () => {
    console.log(`Server running at port 8080`);
});