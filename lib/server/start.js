const bodyParser = require('body-parser');
const compression = require('compression');
const consign = require('consign');
const database = require('./../services/mongo/database');
const express = require('express');
const logger = require('./../logger/logger');
const errorHandler = require('./../middlewares/error-handler');
const main = require('./../middlewares/main');
const shell = require('shelljs');
const ypsilonrc = require('./../../../../.ypsilonrc.json');
let morgan = require('morgan');
let cors = require('cors');
let path = require('path');

const app = express();

function init(appInjector) {
    const port = ypsilonrc.port;
    const serviceName = ypsilonrc.name;

    addToNginx(serviceName, port);
    database.connect(serviceName);
    app.routes = express.Router();

    app.use(morgan('dev')); // log requests to the console
    app.use(cors());
    app.use(compression());
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    app.use(main.first);
    app.use(/^(?!\/api).*/, express.static(`${__dirname}/../client`));
    app.set('view engine', 'ejs');
    app.set('views', './../../../../server/views');
    app.use('/api/', app.routes);

    consign({cwd: 'server', logger})
        .include('controllers')
        .then('routes')
        .into(app);

    app.use(errorHandler);
    app.use(main.last);
    if (appInjector) {
        appInjector(app);
    }

    app.listen(port, () => logger.info(`Server listening on port ${port} in ${app.get('env')} mode.`));

}

function addToNginx(serviceName, port) {
    serviceName = serviceName + '.dev.ypsilon.club';

    shell.rm('-f', `/etc/nginx/sites-available/${serviceName}`);
    shell.rm('-f', `/etc/nginx/sites-enabled/${serviceName}`);

    shell.pwd();
    shell.cp('-f', './node_modules/ypsilon/nginx/__template__', `/etc/nginx/sites-available/${serviceName}`);


// Replace DOMAIN name in nginx template

    shell.sed('-i', `__DOMAIN__`, serviceName, `/etc/nginx/sites-available/${serviceName}`);
    shell.sed('-i', `__PORT__`, port, `/etc/nginx/sites-available/${serviceName}`);


    shell.ln('-sf', `/etc/nginx/sites-available/${serviceName}`, `/etc/nginx/sites-enabled/${serviceName}`);
    shell.exec('sudo /etc/init.d/nginx reload');
}

module.exports = init;