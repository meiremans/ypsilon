let logger = require('./lib/logger/logger');
let errors = require('./lib/errors/errors');
let errorHandler = require('./lib/middlewares/error-handler');
let main = require('./lib/middlewares/main');
let request = require('./lib/request/json');
let mongo = require('./lib/services/mongo/database');
let middlewares = require('./lib/middlewares');
let auth = require('./lib/middlewares/auth');
let schema = require('./lib/mom/schema');
let init = require('./lib/server/start');

/*
the ypsilon internal calls
 */
let userService = require('./lib/services/ypsilon/users');
let appointmentService = require('./lib/services/ypsilon/appointments');
let abstracterService = require('./lib/services/ypsilon/abstracter');




module.exports = {
    init,
    auth,
    middlewares,
    logger,
    errors,
    errorHandler,
    main,
    request,
    mongo,
    userService,
    appointmentService,
    abstracterService,
    schema
};