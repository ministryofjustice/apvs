/**
 * This file defines the database connection to the MySQL database.
 */
const client = require('knex')

// Database connection details.
const CLIENT = 'mysql'
const HOST = process.env.MYSQL_HOST
const USERNAME = process.env.MYSQL_USER
const PASSWORD = process.env.MYSQL_PASSWORD
const DATABASE_NAME = process.env.MYSQL_DATABASE

// Pool configuration.
const MIN_CONNECTIONS = 0
const MAX_CONNECTIONS = 10

// TODO: Add debugging true if in development mode.

const DATABASE_CONFIGURATION = {
  client: CLIENT,
  connection: {
    host : HOST,
    user : USERNAME,
    password : PASSWORD,
    database : DATABASE_NAME
  },
  pool: {
    min: MIN_CONNECTIONS,
    max: MAX_CONNECTIONS
  },
}

module.exports = client(DATABASE_CONFIGURATION)
