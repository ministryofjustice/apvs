var request = require('request')
var apiUrl = process.env.API_URL || 'http://node-external-api-apvs:3002/'

module.exports = {
  checkForAutomaticProcessing: function (claim, callback) {
    request.post({url: apiUrl + 'check-for-automatic-processing', json: claim}, function (error, response, result) {
      if (!error && response.statusCode === 200) {
        callback(null, result)
      } else {
        callback(error, null)
      }
    })
  }
}
