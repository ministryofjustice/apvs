/**
 * Defines functions to support building, retrieving, and persisting the isEligibilityModified flag.
 *
 * This flag is intended to indicate whether an eligibility claim is brand new or a modification:
 * - A new claim is one that is started via the 'Start Now' button on the index page with no ID given.
 * - A modification occurs when a claimant indicates their existing eligibility details have changed when submitting a
 *   claim via the 'Claim Now button on the index page'.
 */
var client = require('../eligibility-client')

/**
 * Determine if the given eligibility value equates to true or false.
 * @param eligibility {String} A String that is expected to be either 'Yes' or 'No'
 * @returns {boolean} True if eligibility is equal to 'Yes', false otherwise.
 */
exports.isModified = function (eligibility) {
  return eligibility === 'Yes'
}

/**
 * Builds the object to persist to the database that holds the flag indicating if the claimants eligibility is new or
 * old.
 * @param eligibility {String} A String that is expected to be either 'Yes' or 'No'
 * @returns {{isEligibilityModified: boolean}} An object who's value indicates if the claimants eligibility is new or
 *          old.
 */
exports.build = function (eligibility) {
  return {
    'isEligibilityModified': exports.isModified(eligibility)
  }
}

/**
 * Retrieves the value of isEligibilityModified flag for the claimant with the given id.
 * @param id The id of the claimant to retrieve the isEligibilityModified for.
 * @param callback A function that can be used to access the isEligibilityModified value returned by this function.
 */
exports.get = function (id, callback) {
  client.get(id, function (error, claimant) {
    if (!error) {
      console.log('Successfully retrieved claimant with id: ' + id)
      callback(claimant.isEligibilityModified)
    }
  })
}

/**
 * Adds or updates the isEligibilityModified flag of the claimant with the given id.
 * @param id The id of the claimant that this flag is associated with.
 * @param eligibility {String} A String that is expected to be either 'Yes' or 'No'
 */
exports.update = function (id, eligibility) {
  client.update(id, exports.build(eligibility), function (error, claimant) {
    if (!error) {
      console.log('Successfully modified the isEligibilityModified flag for claimant with id: ' + id)
    }
  })
}
