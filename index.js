let logger = require('./lib/logger/logger');
let errors = require('./lib/errors/errors');
let errorHandler = require('./lib/middlewares/error-handler');
let main = require('./lib/middlewares/main');
let request = require('./lib/request/json');
let mongo = require('./lib/services/mongo/database');
let middlewares = require('./lib/middlewares');
let auth = require('./lib/middlewares/auth');

/*
the ypsilon internal calls
 */
let userService = require('./lib/services/ypsilon/users');




module.exports = {
    auth,
    middlewares,
    logger,
    errors,
    errorHandler,
    main,
    request,
    mongo,
    userService
};