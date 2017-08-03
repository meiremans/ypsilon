let winston = require('winston');
let WinstonGraylog2 = require('winston2-graylog2');

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
                facility: config.graylogFacility,
                bufferSize: 1400
            }
        })
    ]
});

logger.saveRequest = (req, res) => {
    const log = {
        type: 'request',
        request: {
            method: req.method,
            url: req.url,
            dateTimeRequested: req.start,
            id : req.header('Request-Id')
        },
        response: {
            status: res.content.status
        },
        duration: Date.now() - req.start
    };

    logger.info(log);
};

module.exports = logger;
