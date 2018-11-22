'use strict';

const mongoService = require('./mongo.service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    query,
    getById,
    remove,
    update,
    add,
    typesQuery
}

function query(filter) {
    const byStatus = filter.inStock
    const byName = filter.name
    const byType = filter.type
    const sortParams = filter.sortBy.split('_')
    const sortObj = { [sortParams[0]]: +sortParams[1] }
    const findFilters = [{ name: { $regex: `.*${byName}.*` } }]
    if (byStatus !== 'all') {
        if (byStatus === 'inStock') findFilters.push({ inStock: true })
        else findFilters.push({ inStock: false })
    }
    if (byType !== 'all') {
        findFilters.push({ type: byType })
    }
    return mongoService.connectToDB()
        .then(dbConn => {
            const toyCollection = dbConn.collection('toy');
            return toyCollection.find({ $and: findFilters }).sort(sortObj).toArray()
        })
}

function typesQuery() {
    return mongoService.connectToDB()
        .then(dbConn => {
            const toyCollection = dbConn.collection('toy');
            return toyCollection.aggregate([
                {"$group" : {_id:"$type", count:{$sum:1}}}
            ]).toArray()
        //     return toyCollection.find({}, {
        //         projection: { _id: 0, type: 1 }
        //     }).toArray()
        //         .then(types => {
        //             const arrTypes = types.map(type => type.type)

        //             return arrTypes;
        //         })
        // })
    })
}

function getById(toyId) {
    toyId = new ObjectId(toyId)
    return mongoService.connectToDB()
        .then(dbConn => {
            const toyCollection = dbConn.collection('toy');
            return toyCollection.findOne({ _id: toyId })
        })
}

function remove(toyId) {
    toyId = new ObjectId(toyId)
    return mongoService.connectToDB()
        .then(dbConn => {
            const toyCollection = dbConn.collection('toy');
            return toyCollection.remove({ _id: toyId })
        })
}

function update(toy) {
    const toyId = new ObjectId(toy._id)
    return mongoService.connectToDB()
        .then(dbConn => {
            const toyCollection = dbConn.collection('toy');
            return toyCollection.updateOne({ _id: toyId },
                { $set: { name: toy.name, price: toy.price, type: toy.type, inStock: toy.inStock } })
        })
}

function add(toy) {
    return mongoService.connectToDB()
        .then(dbConn => {
            const toyCollection = dbConn.collection('toy');
            return toyCollection.insertOne(toy)
        })
}