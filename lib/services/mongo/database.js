const config = require('../../../config/mongo');
const mongoose = require('mongoose');
const logger = require('./../../logger/logger');

mongoose.Promise = Promise;

let dbUrl = 'mongodb://' + config.mongo.server + ':' + config.mongo.port + '/' ;
if(process.env.MONGO_CONNECTION_STRING){
    dbUrl = process.env.MONGO_CONNECTION_STRING;
}

function connect(database) {
    if(database){
        dbUrl = dbUrl  + database;
    }else{
        dbUrl = dbUrl + config.mongo.database
    }
    mongoose.connect(dbUrl, {  autoReconnect: true });

    mongoose.connection.on('error', err => logger.error({ type: 'MongoDB', message: err.message }));
    mongoose.connection.once('connected', () => logger.info({ type: 'MongoDB', message: 'Mongo connected' }));
    mongoose.connection.on('disconnected', () => logger.info({ type: 'MongoDB', message: 'Mongo disconnected' }));
    mongoose.connection.on('reconnected', () => logger.info({ type: 'MongoDB', message: 'Mongo reconnected' }));
}

const mongoConnection = {
    connect
};

mongoose.set('debug', (collection, method, query) => {
    logger.info({
        type: 'query',
        collection,
        method,
        query
    });
});

module.exports = mongoConnection;
