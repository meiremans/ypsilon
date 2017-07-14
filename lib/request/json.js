let rp = require('request-promise');

function httpGet(uri,queryStrings = {},headers = {} ) {

    headers["User-Agent"] = 'Ypsilon';

    const options = {
        uri: uri,
        qs: queryStrings,
        headers: headers,
        json: true
    };

    rp(options)
        .then(function (result) {
            console.log(result);
        })
        .catch(function (err) {
            console.log(err);
        });
}

function httpPost(uri,body,headers = {} ) {

    headers["User-Agent"] = 'Ypsilon';

    const options = {
        method: 'POST',
        uri: uri,
        body: body,
        json: true
    };

    rp(options)
        .then(function (parsedBody) {
            console.log(parsedBody);
        })
        .catch(function (err) {
            console.log(err)
        });

}

function httpPut(uri,body,headers = {} ) {

    headers["User-Agent"] = 'Ypsilon';

    const options = {
        method: 'PUT',
        uri: uri,
        body: body,
        json: true
    };

    rp(options)
        .then(function (parsedBody) {
            console.log(parsedBody);
        })
        .catch(function (err) {
            console.log(err)
        });

}

function httpPatch(uri,body,headers = {} ) {

    headers["User-Agent"] = 'Ypsilon';

    const options = {
        method: 'PATCH',
        uri: uri,
        body: body,
        json: true
    };

    rp(options)
        .then(function (parsedBody) {
            console.log(parsedBody);
        })
        .catch(function (err) {
            console.log(err)
        });

}

function httpDelete(uri,headers = {} ) {

    headers["User-Agent"] = 'Ypsilon';

    const options = {
        method: 'DELETE',
        uri: uri,
        json: true
    };

    rp(options)
        .then(function (parsedBody) {
            console.log(parsedBody);
        })
        .catch(function (err) {
            console.log(err)
        });

}


module.exports = {
    httpGet,
    httpPost,
    httpPut,
    httpPatch,
    httpDelete
}