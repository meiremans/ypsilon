function isProd(){
    return process.env.NODE_ENV === 'production';
}

function isDev(){
    return process.env.NODE_ENV === 'development';
}

function isLocal(){
    return (!isDev() && !isProd());
}

module.exports = {
    isProd,
    isDev,
    isLocal
}