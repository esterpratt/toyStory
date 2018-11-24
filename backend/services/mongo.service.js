'use strict';

const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://misterToy:misterToy123@ds059205.mlab.com:59205/toy_db'
// const url = 'mongodb://localhost:27017';
const dbName = 'toy_db';

var dbConn = null;

module.exports = {
    connectToDB,
}

function connectToDB() {
    if (dbConn) return Promise.resolve(dbConn);
    
    return new Promise((resolve, reject) => {
        mongoClient.connect(url, (err, client) => {
            if (err) return reject('Cannot connect to Mongo')
            dbConn = client.db(dbName);
            return resolve(dbConn);
        })
    })
}