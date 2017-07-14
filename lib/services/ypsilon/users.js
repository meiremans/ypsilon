const request = require('./../../request/json');
const config = require('./../../../config/ypsilon/users.json');

function validateToken(token) {
    const url = config.uri + config.endpoints.validateToken;
    let result = request.httpGet(url,null,{'Authorization' : token})
    console.log(result);

}

module.exports = {
    validateToken
};