module.exports = {
    NODE_ENV: process.env.NODE_ENV || process.env.PORT || 'development',
    HOST: process.env.HOST || 'localhost' || '127.0.0.1',
    PORT: process.env.PORT || 5000
}