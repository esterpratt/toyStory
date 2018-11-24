'use strict';

const mongoService = require('./mongo.service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    query,
    add,
}

function query({toyId = null, userId = null} = {}) {
    const criteria = {}
    if (toyId) criteria.toyId = new ObjectId(toyId)
    if (userId) criteria.userId = new ObjectId(userId)
    return mongoService.connectToDB()
    .then(dbConn => {
        const reviewCollection = dbConn.collection('review');
        return reviewCollection.aggregate([
            {
                $match : criteria
            },
            {
                $lookup:
                {
                    from: 'toy',
                    localField: 'toyId',
                    foreignField: '_id',
                    as: 'toy'
                }
            },
            {
                $unwind: '$toy'
            },
            {
                $lookup:
                {
                    from: 'user',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            }
        ]).toArray()
    })
}

function add({ content, userId, toyId }) {
    const review = {
        content,
        userId: new ObjectId(userId),
        toyId: new ObjectId(toyId)
    }
    return mongoService.connectToDB()
    .then(dbConn => {
        const toyCollection = dbConn.collection('review');
        return toyCollection.insertOne(review)
    })
}