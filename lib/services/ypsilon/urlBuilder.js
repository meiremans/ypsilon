const routes = require('./../../../config/ypsilon/routes.json');

function buildUrl(serviceName,endpoint){
    const endpoints = routes[serviceName].endpoints;
    const endpoint = endpoints[endpoint];
    const url = `${serviceName}${routes.base.development.prefix}${routes.base.development.host}${endpoint}`;
    return url;
}

module.exports = {
    buildUrl
}