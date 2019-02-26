const defaultConfig = {};

defaultConfig.expiresIn = process.env.JWT_EXPIRESIN || 3600;
defaultConfig.secret = Buffer.from(process.env.JWT_SECRET).toString('base64') || "";



module.exports = defaultConfig;