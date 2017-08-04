const request = require('./../../request/json');
const routes = require('./../../../config/ypsilon/routes.json');
const utils = require('./utils');
const logger = require('./../../logger/logger');
const errors = require('./../../errors/errors');


function push_google_event(token,booking_id,appointments){
    let url = utils.buildUrl('appointments','google_event');
    url = url + '/' + booking_id;
    if (token) {
        return request.httpGet(url, appointments, {'Authorization': token})
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

function push_checkfront_appointment(body){
    let url = utils.buildUrl('appointments','checkfront_appointment');
    logger.debug(url);
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
    push_google_event,
    push_checkfront_appointment
};