const errors = require('./errors.json');

function createError(errorCode) {
    if (!errorCode) {
        const error = errors[errorCode];
        return error;
    }
    return errors[errorCode];
}

function addOptions(error,options) {
    if(options){
        if(options.message){
            error.message = options.message;
        }
        if(options.details){
            error.details = options.details;
        }
        if(options.target){
            error.target = options.target;
        }
        if(options.innererror){
            error.innererror = options.innererror;
        }
    }
    return error;
}

function forbidden(options){
  let error =  errors.Forbidden;
  addOptions(error,options);
}

function unauthorized(options){
  let error =  errors.Unauthorized;
  addOptions(error,options);
}

module.exports = {
    forbidden,
    unauthorized
};
