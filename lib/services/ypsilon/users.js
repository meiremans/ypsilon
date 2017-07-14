const request = require('./../../request/json');
const config = require('./../../../config/ypsilon/users.json');

function validateToken(token) {
    const url = config.uri + config.endpoints.validateToken;
    request.httpGet(url,null,{'Authorization' : token});

}

module.exports = {
    validateToken
};