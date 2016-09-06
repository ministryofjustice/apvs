var client = require('../eligibility-client')

exports.isValid = function (reference, callback) {
  if (client.isValidMongoId(reference)) {
    client.get(reference, function (error, claimant) {
      console.log('Claimant: ' + claimant)

      if (claimant != null && !error) {
        console.log('Reference: ' + reference + ' is valid.')
        callback(true)
      } else {
        console.log('Reference: ' + reference + ' does not exist.')
        callback(false)
      }
    })
  } else {
    console.log('Reference: ' + reference + ' is not valid.')
    callback(false)
  }
}
