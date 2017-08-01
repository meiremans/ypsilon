const ypsilonrc = require('./../../.ypsilonrc.json');
const script = require('./../../server/index.js');


module.exports =  {
    name: ypsilonrc.name,
    script: "npm",
    args:"start",
    env: {
        "NODE_ENV": "development",
    },
    env_production: {
        "NODE_ENV": "production"
    }
};

