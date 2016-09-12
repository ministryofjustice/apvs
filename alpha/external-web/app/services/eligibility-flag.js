/**
 * Defines functions to support building, retrieving, and persisting the isEligibilityModified flag.
 *
 * This flag is intended to indicate whether an eligibility claim is brand new or a modification:
 * - A new claim is one that is started via the 'Start Now' button on the index page with no ID given.
 * - A modification occurs when a claimant indicates their existing eligibility details have changed when submitting a
 *   claim via the 'Claim Now button on the index page'.
 */
var client = require('./eligibility-client')
var logger = require('./bunyan-logger')
var Promise = require('bluebird')

exports.isModified = function (eligibility) {
  return eligibility === 'Yes'
}

exports.build = function (eligibility) {
  return {
    'isEligibilityModified': exports.isModified(eligibility)
  }
}

exports.get = function (id) {
  return new Promise(function (resolve) {
    client.get(id)
      .then(function (claimant) {
        resolve(claimant.isEligibilityModified)
      })
  })
}

exports.update = function (id, eligibility) {
  client.update(id, exports.build(eligibility), function (error, claimant) {
    if (!error) {
      logger.info('Successfully modified the isEligibilityModified flag for claimant with id: ' + id)
    }
  })
}
