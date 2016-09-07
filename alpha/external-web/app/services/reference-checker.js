var client = require('../eligibility-client')
var logger = require('./bunyan-logger').logger

exports.isValid = function (reference, callback) {
  if (client.isValidMongoId(reference)) {
    client.get(reference, function (error, claimant) {
      if (claimant != null && !error) {
        logger.info('Reference: ' + reference + ' is valid.')
        callback(true)
      } else {
        logger.warn('Reference: ' + reference + ' does not exist.')
        callback(false)
      }
    })
  } else {
    logger.warn('Reference: ' + reference + ' is not valid.')
    callback(false)
  }
}
