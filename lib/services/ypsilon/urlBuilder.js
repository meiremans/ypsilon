const routes = require('./../../../config/ypsilon/routes.json');

function buildUrl(serviceName,endpoint){
    const endpoints = routes[serviceName].endpoints;
    const realEndpoint = endpoints[endpoint];
    const url = `http://${serviceName}${routes.base.development.prefix}${routes.base.development.host}${realEndpoint}`;
    return url;
}

module.exports = {
    buildUrl
}