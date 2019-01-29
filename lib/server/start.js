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
const appRoot = require('app-root-path');
const envUtils = require('./../utils/env');
const fileUpload = require('express-fileupload');
const Websocket = require('./../websocket/websocket');
const http = require('http');
const url = require('url');
let app = express();

function init(appInjector, config = {
    addToNginx : false,
    serverRoot : '.'
}) {
    console.log(appRoot.toString());

    const port = ypsilonrc.port;
    const serviceName = ypsilonrc.name;

    if(config.addToNginx){
        addToNginx(serviceName, port);
    }
    database.connect(serviceName);
    app.routes = express.Router();

    //app.use(morgan('dev'));
    app.use(morgan("combined", {stream: {write: message => logger.info(message)}}));// log requests to winston
    app.use(cors());
    app.use(compression());
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    app.use(fileUpload());
    if (typeof appInjector === 'function') {
        app = appInjector(app);
    }
    app.use(main.first);
    app.use(express.static(path.join(appRoot.toString(), '/client')));
    app.set('view engine', 'ejs');
    app.set('views', path.join(appRoot.toString(), config.serverRoot +'/views'));
    app.use('/api/', app.routes);


    consign({cwd: config.serverRoot, logger})
        .include('controllers')
        .then('routes')
        .into(app);


    app.use(errorHandler);
    app.use(main.last);

    app.listen(port, () => logger.info(`Server listening on port ${port} in ${app.get('env')} mode.`));


}

function addToNginx(serviceName, port) {
    const isLinux = /^linux/.test(process.platform);
    if (!isLinux) {
        logger.info('Not a Linux install, so no nginx configuration gets loaded');
        return;
    }
    let template;
    if (envUtils.isProd()) {
        serviceName = serviceName + '.api.ypsilon.club';
        template = './node_modules/ypsilon/nginx/__template_prod__'

    } else {
        serviceName = serviceName + '.dev.ypsilon.club';
        template = './node_modules/ypsilon/nginx/__template_dev__'
    }

    shell.rm('-f', `/etc/nginx/sites-available/${serviceName}`);
    shell.rm('-f', `/etc/nginx/sites-enabled/${serviceName}`);

    shell.pwd();
    shell.cp('-f', template, `/etc/nginx/sites-available/${serviceName}`);


// Replace DOMAIN name in nginx template

    shell.sed('-i', `__DOMAIN__`, serviceName, `/etc/nginx/sites-available/${serviceName}`);
    shell.sed('-i', `__PORT__`, port, `/etc/nginx/sites-available/${serviceName}`);


    shell.ln('-sf', `/etc/nginx/sites-available/${serviceName}`, `/etc/nginx/sites-enabled/${serviceName}`);
    shell.exec('sudo /etc/init.d/nginx reload');

    if (envUtils.isProd()) {
        //add domain to nginx
        shell.exec(`sudo certbot --nginx -n -d ${serviceName} -d ${serviceName}`);
    }
}

module.exports = init;