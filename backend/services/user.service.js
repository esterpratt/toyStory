'use strict';

const mongoService = require('./mongo.service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    checkLogin,
    getById
}

function checkLogin(username) {
    return mongoService.connectToDB()
        .then(dbConn => {
            const userCollection = dbConn.collection('user');
            return userCollection.findOne(username);
        })
}

function getById(userId) {
    userId = new ObjectId(userId)
    return mongoService.connectToDB()
        .then(dbConn => {
            const userCollection = dbConn.collection('user');
            return userCollection.findOne({_id: userId});
        })
}