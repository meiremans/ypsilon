let logger = require('./lib/logger/logger');
let errors = require('./lib/errors/errors');
let errorHandler = require('./lib/middlewares/error-handler');
let main = require('./lib/middlewares/main');
let request = require('./lib/request/json');
let mongo = require('./lib/services/mongo/database');

module.exports = {
    logger,
    errors,
    errorHandler,
    main,
    request,
    mongo
};