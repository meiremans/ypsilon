const request = require('./../../request/json');
const config = require('./../../../config/ypsilon/users.json');
const logger = require('./../../logger/logger');
const errors = require('./../../errors/errors');

function validateToken(token) {
    const url = config.uri + config.endpoints.validateToken;

    request.httpGet(url, null, {'Authorization': token})
        .then(function (response) {
            let verified = !!response.verified;
            logger.info(verified);
            return new Promise((resolve, reject) => {
                if (!verified) {
                    return Promise.reject(y.errors.unauthorized());
                }
                else {
                 return Promise.resolve(verified);
                }
            })
        }).catch(function(response){
        return Promise.reject(y.errors.unauthorized());
    });
}

module.exports = {
    validateToken
};