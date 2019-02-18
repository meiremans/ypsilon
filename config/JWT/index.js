const defaultConfig = {};

defaultConfig.expiresIn = process.env.JWT_EXPIRESIN || 3600;
defaultConfig.secret = new Buffer(process.env.JWT_SECRET,'base64');


module.exports = defaultConfig;