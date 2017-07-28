const userService = require('./../services/ypsilon/users');

function validateRequest(req, res, next) {
    userService.validateToken(req)
        .then(next)
        .catch(next);
}

module.exports = {
    validateRequest
};
