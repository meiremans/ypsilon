const request = require('./../../request/json');
const config = require('./../../../config/ypsilon/users.json');

function validateToken(token) {
    const url = config.uri + config.endpoints.validateToken;
    let verified = false;
    request.httpGet(url, null, {'Authorization': token}).then(function (response) {
        verified = !!response.verified;
    }).finally(function (response) {
        return new Promise((resolve, reject) => {
            if (!verified) {
                reject({status: 403, content: 'You are not allowed to access this page'});
            }
            else {
                resolve()
            }
        })
    });
}

module.exports = {
    validateToken
};