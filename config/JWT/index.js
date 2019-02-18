const defaultConfig = {};

defaultConfig.expiresIn = process.env.JWT_EXPIRESIN || 3600;
defaultConfig.secret = process.env.JWT_SECRET || 'unsafeSecret';


module.exports = defaultConfig;