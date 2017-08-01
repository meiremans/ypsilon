const ypsilonrc = require('./../../.ypsilonrc');

function pm2 (){
    let config = JSON.parse(ypsilonrc);
    let settings = {
        apps : [{
            name: config.name,
            script: "npm",
            args: "start",
            watch: false,
            env: {
                "NODE_ENV": "development",
            },
            env_production: {
                "NODE_ENV": "production"
            }
        }]
    }
}


module.exports = pm2;

