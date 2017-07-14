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
            error.content.message = options.message;
        }
        if (options.details) {
            error.content.details = options.details;
        }
        if (options.target) {
            error.content.target = options.target;
        }
        if (options.innererror) {
            error.content.innererror = options.innererror;
        }
    }
    return error;
}

function makeStatus(error) {
    return {
            status: error.HTTPStatus,
            content: {
                code: error.code,
                message: error.message
            }
        }
}

function processError(error,options){
    return addOptions(makeStatus(error),options);

}

function forbidden(options) {
    return processError(errors.Forbidden, options);
}

function unauthorized(options) {
    return processError(errors.Unauthorized, options);
}

function internalServerError(options) {
    return processError(errors.InternalServerError, options);
}

function resourceNotFound(options) {
    return processError(errors.ResourceNotFound, options);
}

function badRequest(options) {
    return processError(errors.BadRequest, options);
}

function gone(options) {
    return processError(errors.Gone, options);
}

function tooManyRequests(options) {
    return processError(errors.TooManyRequests, options);
}

function badGateway(options) {
    return processError(errors.BadGateway, options);
}

function serviceUnavailable(options) {
    return processError(errors.ServiceUnavailable, options);
}

function gatewayTimeout(options) {
    return processError(errors.GatewayTimeout, options);
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
