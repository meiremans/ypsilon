const errors = require('./../errors/errors');

const logger = require('../logger/logger');


function errorHandler(err, req, res, next) {
    console.log(err);
    if (!err.status) {
        err = errors.internalServerError();
    }
    logger.error(err);
    res.setResponse(err, err.HTTPStatus);
    next();
}

module.exports = errorHandler;
