const request = require('./../../request/json');
const config = require('./../../../config/ypsilon/users.json');

function validateToken(token) {
    const url = config.uri + config.endpoints.validateToken;
    request.httpGet(url,null,{'Authorization' : token}).then(function(response){
        console.log(response);
    });

}

module.exports = {
    validateToken
};