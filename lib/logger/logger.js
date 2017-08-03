let winston = require('winston');


const logger = new (winston.Logger)({
    exitOnError: false,
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'ypsilon.log' })
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
