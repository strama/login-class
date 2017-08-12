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

mongoose.connect(process.env.MONGODB, {
    useMongoClient: true
});
mongoose.connection.once('Connection error', console.error);

// Get all schemas
var schemas = {};
schemas.user = require(__dirname + '/models/user.js')(mongoose);

// Get all controllers
var controllers = {};
controllers.user = require(__dirname + '/controllers/user.js')(schemas);

// Get all routes
var routes = {};
routes.router = require(__dirname + '/router.js')(express, routes);

routes.routes = {};
routes.routes.user = require(__dirname + '/routes/user.js')(controllers.user);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
routes.router(app);

return http.createServer(app).listen(process.env.PORT || 8080, () => {
    console.log(`Server running at port 8080`);
});