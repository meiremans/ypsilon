const request = require('./../../request/json');
const routes = require('./../../../config/ypsilon/routes.json');
const logger = require('./../../logger/logger');
const errors = require('./../../errors/errors');
const urlBuilder = require('./urlBuilder');

function validateToken(token) {
    let url = urlBuilder.buildUrl('users','validateToken');
    if (token) {
        return request.httpGet(url, null, {'Authorization': token})
            .then(function (response) {
                let verified = !!response.verified;
                logger.info(verified);
                return new Promise((resolve, reject) => {
                    if (!verified) {
                        reject(errors.unauthorized());
                    }
                    else {
                        resolve(response);
                    }
                })
            }).catch(function (response) {
                logger.error(response);
                return new Promise((resolve, reject) => {
                    reject(errors.badGateway());
                })
            });
    } else {
        return new Promise((resolve, reject) => {
            reject(errors.unauthorized());
        })
    }
}

module.exports = {
    validateToken
};