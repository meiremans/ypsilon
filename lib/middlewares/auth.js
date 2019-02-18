const userService = require('./../services/ypsilon/users');

function validateRequest(req, res, next) {

    const response = userService.validateToken(req.header('Authorization'));
    console.log(response);
    req.userData = response.tokenData;
    next()
}

module.exports = {
    validateRequest
};
