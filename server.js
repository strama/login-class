// https://github.com/expressjs/express
const express = require('express');
// https://nodejs.org/api/http.html
const http = require('http');

const hostname = '127.0.0.1';
const port = '3000';

const app = express();

return http.createServer(app).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});