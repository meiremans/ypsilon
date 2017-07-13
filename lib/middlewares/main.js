const logger = require('../logger/logger');
const errors = require('../errors/errors');

function first(req, res, next) {
    req.start = new Date();

    res.setResponse = (json, status = 200) => {
        req.used = true;
        res.content = {
            json
        };
        res.status = status;
    };
    next();
}

function last(req, res) {
    console.log(res);
    if (!req.used) {
        const err = errors.resourceNotFound();
        res.status(err.HTTPStatus);
        res.json(err);
    }
    else {
        res.status(res.content.HTTPStatus);
        res.json(res.json);
        logger.saveRequest(req, res);
    }
    res.end();
}

module.exports = {
    first,
    last
};
