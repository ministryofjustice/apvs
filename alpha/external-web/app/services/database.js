/**
 * This file defines the database connection to Mongodb.
 */
var client = require('mongodb')
var logger = require('./bunyan-logger')
exports.client = client

client.connect('mongodb://mongo:27017/apvs', function (error, database) {
  if (!error) {
    exports.db = database
    logger.info('Successfully connected to MongoDB')
  }
})
