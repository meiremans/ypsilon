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
        }).catch(function (err) {
            return new Promise((resolve, reject) => {
                logger.error(`couldnt post to ${url}`);
                reject(errors.badGateway());
            })
        });
}

function getAllProducts(){
    let url = utils.buildUrl('abstracter','products');
    logger.debug(url);

    return request.httpGet(url)
        .then(function (response) {
            return new Promise((resolve, reject) => {
                resolve(response);
            })
        }).catch(function (err) {
            return new Promise((resolve, reject) => {
                logger.error(`couldnt post to ${url}`);
                reject(errors.badGateway());
            })
        });
}

module.exports = {
    addBookingForProduct,
    getAllProducts
};