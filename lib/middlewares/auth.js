const userService = require('./../services/ypsilon/users');
const errors = require('./../errors/errors');


function validateRequest(req, res, next) {

    const response = userService.validateToken(req.header('Authorization'));
    if(!response.verified){
        throw errors.unauthorized();
    }
    req.userData = response.tokenData;
    next()
}

module.exports = {
    validateRequest
};
