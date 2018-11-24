'use strict';

const userService = require('../services/user.service')
const reviewService = require('../services/review.service')

module.exports = addRoutes;

function addRoutes(app) {
    app.get('/user/:userId', (req, res) => {
        const userId = req.params.userId;
        Promise.all([
            userService.getById(userId),
            reviewService.query({userId})
        ])
        .then(([user, reviews]) => {
            res.json({user, reviews})
        });
    })
}