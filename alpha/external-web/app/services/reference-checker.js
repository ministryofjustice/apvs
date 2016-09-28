var client = require('./database/eligibility-client')

exports.isValid = function (reference, collection) {
  return new Promise(function (resolve) {
    client.get(reference, collection)
      .then(function (claimant) {
        var isValidID = client.isValidMongoId(reference) && claimant != null
        resolve(isValidID)
      })
      .catch(function () {
        resolve(false)
      })
  })
}
