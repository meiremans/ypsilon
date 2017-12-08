const ws = require('ws');
let wss;

class Websocket {
    constructor(server) {
        this.wss = new ws.Server({server});
        wss.on('connection', function connection(ws, req) {
            const location = url.parse(req.url, true);
            // You might use location.query.access_token to authenticate or share sessions
            // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

            ws.on('message', function incoming(message) {
                console.log('received: %s', message);
            });
            ws.send('something');
        });
    }

    broadcast(message) {
        wss.broadcast(message);
    }
}

module.exports = Websocket;