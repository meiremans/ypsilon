const ws = require('ws');
const url = require('url');
let wss;

class Websocket {

    constructor(server) {
        wss = new ws.Server({port:8080});
        wss.on('connection', function connection(ws, req) {
            const location = url.parse(req.url, true);
            // You might use location.query.access_token to authenticate or share sessions
            // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

            ws.on('message', function incoming(message) {
                console.log('received: %s', message);
            });
            ws.send('something');
        });

        wss.broadcast = function broadcast(data) {
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(data);
                }
            });
        };
    }

    broadcast(message) {
        console.log(message);
        wss.broadcast(message);
    }
}

module.exports = Websocket;