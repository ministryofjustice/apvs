/**
 * This file defines the database connection to Mongodb.
 */
var client = require('mongodb')
exports.client = client

client.connect('mongodb://mongo:27017/apvs', function (error, database) {
  if (!error) {
    exports.db = database
    console.log('Successfully connected to MongoDB')
  }
})
