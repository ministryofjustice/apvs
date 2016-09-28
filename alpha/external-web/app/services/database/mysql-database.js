/**
 * This file defines the database connection to the MySQL database.
 */
const knex = require('knex')

// Database connection details.
const CLIENT = 'mysql'
const HOST = '127.0.0.1'
const USERNAME = 'apvs'
const PASSWORD = 'apvs'
const DATABASE_NAME = 'apvs'

// Pool configuration.
const MIN_CONNECTIONS = 0
const MAX_CONNECTIONS = 10

const DATABASE_CONFIGURATION = {
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
  },
  debug: true
}

module.exports = knex(DATABASE_CONFIGURATION)