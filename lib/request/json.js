let rp = require('request-promise');
const logger = require('./../logger/logger');

function httpGet(uri,queryStrings = {},headers = {} ) {

    headers["User-Agent"] = 'Ypsilon';

    const options = {
        uri: uri,
        qs: queryStrings,
        headers: headers,
        json: true
    };
    logger.info(options);

    return rp(options);
}

function httpPost(uri,body,headers = {} ) {

    headers["User-Agent"] = 'Ypsilon';

    const options = {
        method: 'POST',
        uri: uri,
        body: body,
        headers:headers,
        json: true
    };

    logger.info(options);
    return rp(options);

}

function httpFormPost(uri,form,headers = {}){
    const options = {
        method: 'POST'
        ,headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        ,json: true
        ,uri: uri
        ,form : form
    };
    logger.info(options);
    return rp(options);

}

function httpPut(uri,body,headers = {} ) {

    headers["User-Agent"] = 'Ypsilon';

    const options = {
        method: 'PUT',
        uri: uri,
        body: body,
        json: true
    };

    logger.info(options);
    return rp(options);

}

function httpPatch(uri,body,headers = {} ) {

    headers["User-Agent"] = 'Ypsilon';

    const options = {
        method: 'PATCH',
        uri: uri,
        body: body,
        json: true
    };

    logger.info(options);
    return rp(options);

}

function httpDelete(uri,headers = {} ) {

    headers["User-Agent"] = 'Ypsilon';

    const options = {
        method: 'DELETE',
        uri: uri,
        json: true
    };

    logger.info(options);
    return rp(options);

}


module.exports = {
    httpGet,
    httpPost,
    httpPut,
    httpPatch,
    httpDelete,
    httpFormPost
}