const request = require('./../../request/json');
const routes = require('./../../../config/ypsilon/routes.json');
const logger = require('./../../logger/logger');
const errors = require('./../../errors/errors');
const utils = require('./utils');

function validateToken(token) {
    let url = utils.buildUrl('users','validateToken');
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

function exchangeSecret(secret) {
    let url = utils.buildUrl('users','exchangeSecret');
    const body = {secret};
        return request.httpPost(url,body)
            .then(function (response) {
                return new Promise((resolve, reject) => {
                        resolve(response);
                })
            }).catch(function (response) {
                logger.error(response);
                return new Promise((resolve, reject) => {
                    reject(errors.badGateway());
                })
            });
}

function registerUser(wordpressId,wordpressUrl,email,password,username){


    let url = utils.buildUrl('users','register');
    logger.debug(url);

    const body = {
        wordpressId,
        wordpressUrl,
        email,
        password,
        username
    };

    logger.debug(body);

    return request.httpPost(url, body)
        .then(function (response) {
            return new Promise((resolve, reject) => {
                resolve(response);
            })
        }).catch(function (response) {
            logger.error(response);
            return new Promise((resolve, reject) => {
                reject(errors.badGateway());
            })
        });
}

module.exports = {
    exchangeSecret,
    validateToken,
    registerUser
};