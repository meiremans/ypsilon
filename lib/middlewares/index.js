const errorHandler = require('./error-handler');
const main = require('./main');
const auth = require('./auth');

module.exports = [
    auth,
    errorHandler,
    main
];