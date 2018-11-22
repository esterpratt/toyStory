'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const toyRoute = require('./routes/toy.route')
const cors = require('cors')
app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));
toyRoute(app);


app.listen(3000)