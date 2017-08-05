const request = require('./../../request/json');
const routes = require('./../../../config/ypsilon/routes.json');
const utils = require('./utils');
const logger = require('./../../logger/logger');
const errors = require('./../../errors/errors');


function push_booking(booking){
    let url = utils.buildUrl('checkfront','booking');
        return request.httpGet(url, booking)
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
    push_booking
};