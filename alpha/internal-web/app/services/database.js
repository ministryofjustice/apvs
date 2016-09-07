/**
 * This file defines the database connection to Mongodb.
 */
var logger = require('./bunyan-logger').logger
var client = require('mongodb')
exports.client = client

client.connect('mongodb://mongo:27017/apvs', function (error, database) {
  if (!error) {
    exports.db = database
    logger.info('Successfully connected to MongoDB')
  }
})
