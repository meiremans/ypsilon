const routes = require('./../../../config/ypsilon/routes.json');
const request = require('./../../request/json');
const errors = require('./../../errors/errors');
const logger = require('./../../logger/logger');

function buildUrl(serviceName,endpoint){
    const endpoints = routes[serviceName].endpoints;
    const realEndpoint = endpoints[endpoint];
    const url = `http://${serviceName}${routes.base.development.prefix}${routes.base.development.host}${realEndpoint}`;
    return url;
}

function post(token,url,body,headers){
    if (token) {
        headers.Authorization = token;
        return request.httpPost(url, body, headers)
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
    buildUrl,
    post
};