'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app = express();

const toyRoute = require('./routes/toy.route')
const userRoute = require('./routes/user.route')
const reviewRoute = require('./routes/review.route')
const userService = require('./services/user.service')

const cors = require('cors')

app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true
}))
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(cookieParser());
app.use(session({
    secret: 'puki muki',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

app.use(express.static('public'));
toyRoute(app);
userRoute(app);
reviewRoute(app);

app.put('/login', (req, res) => {
    const username = req.body;
    userService.checkLogin(username)
        .then(user => {
            req.session.user = user;
            req.session.save()
            res.json(user);
        })
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
})