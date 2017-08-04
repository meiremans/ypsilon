const request = require('./../../request/json');
const routes = require('./../../../config/ypsilon/routes.json');
const utils = require('./utils');
const logger = require('./../../logger/logger');
const errors = require('./../../errors/errors');

function addBookingForProduct(bookable_wordpress_id, body){
    let url = utils.buildUrl('abstracter','bookings');
    url = `${url}/${bookable_wordpress_id}`;
    logger.debug(url);

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
    addBookingForProduct
};