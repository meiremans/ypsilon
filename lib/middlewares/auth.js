const userService = require('./../services/ypsilon/users');

function validateRequest(req, res, next) {

    userService.validateToken(req.header('Authorization'))
        .then((response) => {
            console.log(response);
            req.userData = response.tokenData;
            next()
        })
        .catch(next);
}

module.exports = {
    validateRequest
};
