let winston = require('winston');
let WinstonGraylog2 = require('winston-graylog2');
const ypsilonrc = require('./../../../../.ypsilonrc.json');
const envUtils = require('./../utils/env');
winston.level = 'warn';


const grayLogSettings = {
    name: 'Graylog',
    level: 'debug',
    silent: false,
    handleExceptions: false,
    prelog: function (msg) {
        return msg.trim();
    },
    graylog: {
        servers: [{
            host: '10.0.8.194',
            port: 12201
        }],
        hostname: 'byc',
        facility: 'ypsilon-prod',
        bufferSize: 1400
    },
    staticMeta: {env: process.env.NODE_ENV, service: ypsilonrc.name}
};
    transports = [
        new (WinstonGraylog2)(grayLogSettings)
    ];

let logger = new (winston.Logger)({
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
