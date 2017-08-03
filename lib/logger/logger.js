let winston = require('winston');
let WinstonGraylog2 = require('winston-graylog2');

const logger = new (winston.Logger)({
    exitOnError: false,
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'ypsilon.log' }),
        new (WinstonGraylog2)({
            name            : 'Graylog',
            level           : 'info',
            silent          : false,
            handleExceptions: false,
            prelog          : function (msg) {
                return msg.trim();
            },
            graylog         : {
                servers   : [{
                    host: '10.0.8.194',
                    port: 12201
                }],
                hostname: 'bycdev',
                facility: 'ypsilon',
                bufferSize: 1400
            }
        })
    ]
});

logger.saveRequest = (req, res) => {
    const reqId = res.header('Y-Request-Id');
    console.log(reqId);
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
        duration: Date.now() - req.start
    };
    logger.log('info', 'Request', log);
};

module.exports = logger;
