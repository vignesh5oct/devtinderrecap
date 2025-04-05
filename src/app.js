const express = require('express');
const routes = require('./routes/index');


const app = express();

// Middleware to parse JSON requests
app.use(express.json());

app.use('/v1', routes);



module.exports = app;
