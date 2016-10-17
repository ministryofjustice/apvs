module.exports = {
  development: {
    client: 'mssql',
    connection: {
      host: process.env.APVS_DATABASE_SERVER,
      user: process.env.APVS_MIGRATIONS_USERNAME,
      password: process.env.APVS_MIGRATIONS_PASSWORD,
      database: process.env.APVS_DATABASE,
      options: {
        encrypt: true
      }
    }
  }
}
