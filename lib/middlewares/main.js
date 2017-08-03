const logger = require('../logger/logger');
const errors = require('../errors/errors');
const uuid = require('uuid/v4');
const ypsilonrc = require('./../../.ypsilonrc.json');

function first(req, res, next) {
    req.start = new Date();
    let requestId  = req.header('Y-Request-Id');
    let origin  = req.header('Y-Origin');
    if(!requestId){
        requestId = uuid();
    }

    if(!origin){
        origin = req.header('x-forwarded-for');
    }

    res.setResponse = (json, status = 200) => {
        res.setHeader('X-Powered-By', 'Ypsilon');
        res.setHeader('Y-Request-Id', requestId);
        res.setHeader('Y-Origin',origin);
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
        res.status(err.status);
        res.json(err.content);
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
