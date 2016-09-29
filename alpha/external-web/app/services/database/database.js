/**
 * This file defines the database connection to Mongodb.
 */
var Promise = require('bluebird')
var client = Promise.promisifyAll(require('mongodb'))
var logger = require('../bunyan-logger')
exports.client = client

client.connect('mongodb://mongo:27017/apvs')
  .then(function (database) {
    exports.db = database
    logger.info('Successfully connected to MongoDB')
  })
  .catch(function (error) {
    logger.fatal('Failed to connect to MongoDB. %s', error)
  })
