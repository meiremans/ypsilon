const request = require('./../../request/json');
const config = require('./../../../config/ypsilon/users.json');

function validateToken(token) {
    const url = config.uri + config.endpoints.validateToken;

    request.httpGet(url, null, {'Authorization': token})
        .then(function (response) {
            let verified = !!response.verified;
            console.log(verified);
            return new Promise((resolve, reject) => {
                if (!verified) {
                    reject({status: 403, content: 'You are not allowed to access this page'});
                }
                else {
                    resolve()
                }
            })
        }).catch(function(response){
        reject({status: 403, content: 'You are not allowed to access this page'});
    }));
}

module.exports = {
    validateToken
};