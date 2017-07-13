const logger = require('../logger/logger');
const errors = require('../errors/errors');

function first(req, res, next) {
    req.start = new Date();

    res.setResponse = (json, status = 200) => {
        req.used = true;
        res.content = {
            json,
            status
        };
    };
    next();
}

function last(req, res) {
    if (!req.used) {
        const err = errors.resourceNotFound();
        res.status(err.HTTPStatus);
        res.json(err);
    }
    else {
        res.status(res.content.status);
        res.json(res.content.json);
        logger.saveRequest(req, res);
    }
    res.end();
}

module.exports = {
    first,
    last
};
