'use strict';

const toyService = require('../services/toy.service')

module.exports = addRoutes;

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
        toyService.getById(toyId)
            .then(toy => res.json(toy));
    })

    // delete toy
    app.delete('/toy/:toyId', (req, res) => {
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