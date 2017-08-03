let winston = require('winston');
var graylog2 = require("graylog2");
var glogger = new graylog2.graylog({
    servers: [
        { 'host': '10.0.8.194', port: 12201 },
        { 'host': '127.0.0.1', port: 12201 }
    ],
    hostname: 'server.name', // the name of this host
                             // (optional, default: os.hostname())
    facility: 'Node.js',     // the facility for these log messages
                             // (optional, default: "Node.js")
    bufferSize: 1350         // max UDP packet size, should never exceed the
                             // MTU of your system (optional, default: 1400)
});

glogger.on('error', function (error) {
    console.error('Error while trying to write to graylog2:', error);
});
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
    glogger.log('hello');
    console.log('hello');
};

module.exports = logger;
