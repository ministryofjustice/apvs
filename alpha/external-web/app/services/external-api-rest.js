var request = require('request')
var apiUrl = process.env.API_URL || 'http://external-api-apvs:3002/'

exports.checkForAutomaticProcessing = function (claim) {
  return new Promise(function (resolve, reject) {
    request.post({ url: apiUrl + 'check-for-automatic-processing', json: claim }, function (error, response, result) {
      if (!error && response.statusCode === 200) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}
