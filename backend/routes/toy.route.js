'use strict';

const toyService = require('../services/toy.service')
const reviewService = require('../services/review.service')
// const session = require('express-session')
module.exports = addRoutes;

function requiredAuth(req, res, next) {
    console.log(req.session);
    const user = req.session.user;
    if (user) return res.status(200).send('Not Allowed')
    else next()
}

function addRoutes(app) {
    // get all toys
    app.get('/toy', (req, res) => {
        const filter = req.query;
        toyService.query(filter)
            .then(toys => res.json(toys));
    })

    // get types count
    app.get('/type', (req, res) => {
        toyService.typesQuery()
            .then(typeCount => res.json(typeCount));
    })

    // get one toy
    app.get('/toy/:toyId', (req, res) => {
        const toyId = req.params.toyId;
        Promise.all([
            toyService.getById(toyId),
            reviewService.query({toyId})
        ])
        .then(([toy, reviews]) => {
            res.json({toy, reviews})
        });
    })

    // TODO: add middleware to delete, update and add
    // delete toy
    app.delete('/toy/:toyId', requiredAuth, (req, res) => {
        const toyId = req.params.toyId;
        toyService.remove(toyId)
            .then(_ => res.end());
    })

    // update toy
    app.put('/toy/:toyId', (req, res) => {
        const toy = req.body;
        toyService.update(toy)
            .then(toy => res.json(toy));
    })
    
    // add toy
    app.post('/toy', (req, res) => {
        const toy = req.body;
        toyService.add(toy)
            .then(toy => res.json(toy));
    })
}