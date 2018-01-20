const ypsilonrc = require('./../../../../.ypsilonrc.json');
const envUtils = require('./../utils/env');
const prodLogger = require('./../logger/prodLogger');
const devLoggger = require('./../logger/devLogger');
const localLoggger = require('./../logger/localLogger');


if(envUtils.isProd()){
    module.exports = prodLogger;
}
if(envUtils.isDev()){
    module.exports = devLoggger;
}
if(envUtils.isLocal()){
    module.exports = localLoggger;
}

