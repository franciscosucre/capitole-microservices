module.exports = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    database: process.env.DB_DATABASE || 'orders',
    username: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    options: {
        useNewUrlParser: true
    }
}
