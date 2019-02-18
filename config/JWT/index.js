const defaultConfig = {};

defaultConfig.jwt.expiresIn = process.env.JWT_EXPIRESIN || 3600;
defaultConfig.jwt.secret = process.env.JWT_SECRET|| 'unsafeSecret';


module.exports = defaultConfig;