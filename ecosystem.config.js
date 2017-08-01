const ypsilonrc = require('./../../.ypsilonrc');

function pm2 (){
    let settings = {
        apps : [{
            name: ypsilonrc.name,
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

