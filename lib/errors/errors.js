const errors = require('./errors.json');

function createError(errorCode) {
    if (!errorCode) {
        const error = errors[errorCode];
        return error;
    }
    return errors[errorCode];
}

function addOptions(error, options) {
    if (options) {
        if (options.message) {
            error.message = options.message;
        }
        if (options.details) {
            error.details = options.details;
        }
        if (options.target) {
            error.target = options.target;
        }
        if (options.innererror) {
            error.innererror = options.innererror;
        }
    }
    return error;
}

function forbidden(options) {
    return addOptions(errors.Forbidden, options);
}

function unauthorized(options) {
    return addOptions(errors.Unauthorized, options);
}

function internalServerError(options) {
    return addOptions(errors.InternalServerError, options);
}

function resourceNotFound(options) {
    return addOptions(errors.ResourceNotFound, options);
}

function badRequest(options) {
    return addOptions(errors.BadRequest, options);
}

function gone(options) {
    return addOptions(errors.Gone, options);
}

function tooManyRequests(options) {
    return addOptions(errors.TooManyRequests, options);
}

function badGateway(options) {
    return addOptions(errors.BadGateway, options);
}

function serviceUnavailable(options) {
    return addOptions(errors.ServiceUnavailable, options);
}

function gatewayTimeout(options) {
    return addOptions(errors.GatewayTimeout, options);
}

module.exports = {
    internalServerError,
    resourceNotFound,
    badRequest,
    gone,
    tooManyRequests,
    badGateway,
    serviceUnavailable,
    gatewayTimeout,
    forbidden,
    unauthorized
};
