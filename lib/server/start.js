const bodyParser = require('body-parser');
const compression = require('compression');
const consign = require('consign');
const database = require('./../services/mongo/database');
const express = require('express');
const logger = require('./../logger/logger');
const errorHandler = require('./../middlewares/error-handler');
const main = require('./../middlewares/main');

const app = express();

function init (serviceName,port) {

    database.connect(serviceName);
    app.routes = express.Router();

    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(main.first);
    app.use(/^(?!\/api).*/, express.static(`${__dirname}/../client`));
    app.use('/api/', app.routes);

    consign({cwd: 'server', logger})
        .include('controllers')
        .then('routes')
        .into(app);

    app.use(errorHandler);
    app.use(main.last);

    app.listen(port, () => logger.info(`Server listening on port ${port} in ${app.get('env')} mode.`));

}

module.exports = init;