const ypsilonrc = require('./../../.ypsilonrc.json');

function pm2 (){
    let config = JSON.parse(ypsilonrc);
    return  {
        apps : [{
            name: config.name,
            script: "./../../server",
            args: "",
            env: {
                "NODE_ENV": "development",
            },
            env_production: {
                "NODE_ENV": "production"
            }
        }]
    };
}


module.exports = pm2;

