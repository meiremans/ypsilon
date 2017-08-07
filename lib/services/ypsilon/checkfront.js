const request = require('./../../request/json');
const routes = require('./../../../config/ypsilon/routes.json');
const utils = require('./utils');
const logger = require('./../../logger/logger');
const errors = require('./../../errors/errors');


function push_booking(token,booking){
    let url = utils.buildUrl('checkfront','booking');
        return request.httpPost(url, booking,{'Authorization': token})
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



function getItems(token){
    let url = utils.buildUrl('checkfront','item');
    if (token) {
        return request.httpGet(url, {'Authorization': token})
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

function linkProduct(token,checkfrontProduct,wordpressId){
    let url = utils.buildUrl('checkfront','linkproduct');
    let body = {
        checkfrontId : checkfrontProduct,
        wordpressId : wordpressId
    };
    logger.info('token',token);
    if (token) {
        return request.httpPost(url,body, {'Authorization': token})
            .then(function (response) {
                return new Promise((resolve, reject) => {
                        resolve(response);
                })
            });
    } else {
        return new Promise((resolve, reject) => {
            reject(errors.unauthorized());
        })
    }
}

function registerUser(token,user){
    let url = utils.buildUrl('checkfront','registerUser');
    let body = {
        checkfrontId : checkfrontProduct,
        wordpressId : wordpressId
    };
    logger.info('token',token);
    if (token) {
        return request.httpPost(url,body, {'Authorization': token})
            .then(function (response) {
                return new Promise((resolve, reject) => {
                    resolve(response);
                })
            });
    } else {
        return new Promise((resolve, reject) => {
            reject(errors.unauthorized());
        })
    }
}



module.exports = {
    push_booking,
    getItems,
    linkProduct
};