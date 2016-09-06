/**
 * This file defines the database connection to Mongo and can be included in files that require database access with:
 * var mongo = require('./database')
 */
var log4js = require('./log4js')
var LOGGER = log4js.getLogger('database')

var client = require('mongodb')
exports.client = client

client.connect('mongodb://mongo:27017/apvs', function (error, database) {
  if (!error) {
    exports.db = database
    LOGGER.info('Successfully connected to MongoDB')
  }
})
