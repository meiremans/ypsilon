const request = require('./../../request/json');
const routes = require('./../../../config/ypsilon/routes.json');
const urlBuilder = require('./urlBuilder');
const logger = require('./../../logger/logger');
const errors = require('./../../errors/errors');


function push_google_event(token,booking_id,appointments){
    let url = urlBuilder.buildUrl('appointments','google_event');
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

module.exports = {
    push_google_event
};