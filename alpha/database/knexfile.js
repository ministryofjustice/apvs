// Database connection details.
const CLIENT = 'mysql'
const HOST = '127.0.0.1'
const USERNAME = 'apvs'
const PASSWORD = 'apvs'
const DATABASE_NAME = 'apvs'

// Pool configuration.
const MIN_CONNECTIONS = 0
const MAX_CONNECTIONS = 10

const DEVELOPMENT_CONFIGURATION = {
  client: CLIENT,
  connection: {
    host: HOST,
    user: USERNAME,
    password: PASSWORD,
    database: DATABASE_NAME
  },
  pool: {
    min: MIN_CONNECTIONS,
    max: MAX_CONNECTIONS
  }
}

module.exports = {

  development: DEVELOPMENT_CONFIGURATION,
  staging: DEVELOPMENT_CONFIGURATION,
  production: DEVELOPMENT_CONFIGURATION

}
