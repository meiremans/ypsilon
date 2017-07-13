let Logger = require('./lib/logger/logger');
let Errors = require('./lib/errors/errors');
let ErrorHandler = require('./lib/middlewares/error-handler');
let Main = require('./lib/middlewares/main');

module.exports = {
    Logger,
    Errors,
    ErrorHandler,
    Main
};