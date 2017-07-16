// https://github.com/expressjs/express
const express = require('express');
// https://nodejs.org/api/http.html
const http = require('http');
// https://github.com/Automattic/mongoose
const mongoose = require('mongoose');

mongoose.connect('mongodb://root:root@ds155192.mlab.com:55192/fiap-class', {
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

routes.middlewares = {};
routes.middlewares.user = require(__dirname + '/middlewares/user.js')(controllers.user);

const hostname = '127.0.0.1';
const port = '3000';

const app = express();
routes.router(app);

return http.createServer(app).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});