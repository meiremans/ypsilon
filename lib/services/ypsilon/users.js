const request = require('./../../request/json');
const routes = require('./../../../config/ypsilon/routes.json');
const logger = require('./../../logger/logger');
const errors = require('./../../errors/errors');
const jsonwebtoken = require('jsonwebtoken');
const utils = require('./utils');
const configJWT = require('../../../config/JWT');

function validateToken(token) {
    return jsonwebtoken.verify(token, configJWT.secret, function (err, decoded) {
        if (!err) {
            return {
                verified: 'true',
                tokenData:decoded
            };
        } else {
            console.error(err);
            return {
                verified: 'false'
            };

        }


    })
}


function exchangeSecret(secret) {
    let url = utils.buildUrl('users', 'exchangeSecret');
    const body = {secret};
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

function registerUser(wordpressId, wordpressUrl, email, password, username) {


    let url = utils.buildUrl('users', 'register');
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

function loginbyusername(username) {
    let url = utils.buildUrl('users', 'loginbyusername');
    const body = {
        username
    };
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
    registerUser,
    loginbyusername
};