const defaultConfig = require('./default');


defaultConfig.mongo.server = process.env.MONGO_SERVER || defaultConfig.mongo.server;
defaultConfig.mongo.database = process.env.MONGO_DB || defaultConfig.mongo.database;
defaultConfig.mongo.port = process.env.MONGO_PORT || defaultConfig.mongo.port;


module.exports = defaultConfig;
