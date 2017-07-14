const winston = require('winston');
require('winston-papertrail').Papertrail;


let winstonPapertrail = new winston.transports.Papertrail({
    program : 'Ypsilon',
    host: 'logs5.papertrailapp.com',
    port: 40414
});


const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({ filename: 'ypsilon.log' }),
        winstonPapertrail
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
