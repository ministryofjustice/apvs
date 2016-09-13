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

exports.get = function (id, collection) {
  return new Promise(function (resolve) {
    client.get(id, collection)
      .then(function (claimant) {
        resolve(claimant.isEligibilityModified)
      })
  })
}

exports.update = function (id, eligibility, collection) {
  return new Promise(function (resolve, reject) {
    client.update(id, exports.build(eligibility), collection)
      .then(function (claimant) {
        logger.info('Successfully modified the isEligibilityModified flag for claimant with id: ' + id)
        resolve(claimant)
      })
      .catch(function (error) {
        logger.error('Failed to modify the isEligibilityModified flag for claimant with id: %s. Error: %s', id, error)
        reject(error)
      })
  })
}
