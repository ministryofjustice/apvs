var client = require('./eligibility-client')

exports.isValid = function (reference) {
  return new Promise(function (resolve) {
    client.get(reference)
      .then(function (claimant) {
        var isValidID = client.isValidMongoId(reference) && claimant != null
        resolve(isValidID)
      })
      .catch(function () {
        resolve(false)
      })
  })
}
