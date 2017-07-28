const userService = require('./../services/ypsilon/users');

function validateRequest(req, res, next) {
    userService.validateToken(req.header('Authorization'))
        .then(next)
        .catch(next);
}

module.exports = {
    validateRequest
};
