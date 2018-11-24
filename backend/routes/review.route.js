'use strict';

const reviewService = require('../services/review.service')
module.exports = addRoutes;

function addRoutes(app) {

    app.get('/review', (req, res) => {
        reviewService.query()
        .then(reviews =>  res.json(reviews))
    })

    app.post('/review', (req, res) => {
        const review = req.body
        reviewService.add(review)
            .then(review => res.json(review))
    })
}