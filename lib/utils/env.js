function isProd(){
    return app.get('env') === 'production';

}

module.exports = {
    isProd
}