let logger = require('./lib/logger/logger');
let errors = require('./lib/errors/errors');
let errorHandler = require('./lib/middlewares/error-handler');
let main = require('./lib/middlewares/main');
let request = require('./lib/request/json');
let requestBody = require('./lib/request/body');
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
let checkfrontService = require('./lib/services/ypsilon/checkfront');
let bluebearService = require('./lib/services/ypsilon/bluebear');




module.exports = {
    init,
    auth,
    middlewares,
    logger,
    errors,
    errorHandler,
    main,
    request,
    requestBody,
    mongo,
    userService,
    appointmentService,
    abstracterService,
    checkfrontService,
    bluebearService,
    schema
};