let winston = require('winston');
const ypsilonrc = require('./../../../../.ypsilonrc.json');
const envUtils = require('./../utils/env');
winston.level = 'debug';


let transports = [
    new (winston.transports.Console)(),
    new (winston.transports.File)({filename: 'ypsilon.log'})
];

let logger = winston.createLogger({
    exitOnError: false,
    transports
});

logger.saveRequest = (req, res) => {
    const reqId = res.getHeader('Y-Request-Id');
    const origin = res.getHeader('Y-Origin');

    const log = {
        type: 'request',
        request: {
            method: req.method,
            url: req.url,
            dateTimeRequested: req.start
        },
        response: {
            status: res.content.status
        },
        duration: Date.now() - req.start,
        yrequestid: reqId,
        origin: origin
    };
    logger.log('info', `${req.method} ${req.url}`, log);
};

module.exports = logger;
