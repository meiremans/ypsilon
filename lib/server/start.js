const bodyParser = require('body-parser');
const compression = require('compression');
const consign = require('consign');
const database = require('./../services/mongo/database');
const express = require('express');
const logger = require('./../logger/logger');
const errorHandler = require('./../middlewares/error-handler');
const main = require('./../middlewares/main');
const shell = require('shelljs');

const app = express();

function init (serviceName,port) {

    addToNginx(serviceName,port);
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

function addToNginx(serviceName,port){
    serviceName = serviceName + '.dev.api.ypsilon.club';

    shell.rm('-f', `/etc/nginx/sites-available/${serviceName}`);
    shell.rm('-f', `/etc/nginx/sites-enabled/${serviceName}`);

    shell.pwd();
    shell.cp('-f', './node_modules/ypsilon/nginx/__template__', `/etc/nginx/sites-available/${serviceName}`);


// Replace DOMAIN name in nginx template

    shell.sed('-i',`__DOMAIN__`,serviceName,  `/etc/nginx/sites-available/${serviceName}`);
    shell.sed('-i', `__PORT__`,port,`/etc/nginx/sites-available/${serviceName}`);


    shell.ln('-sf',`/etc/nginx/sites-available/${serviceName}`, `/etc/nginx/sites-enabled/${serviceName}`);
    shell.exec('sudo /etc/init.d/nginx reload');
}

module.exports = init;