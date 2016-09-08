var express = require('express')
var claimChecker = require('../lib/claim-checker')

module.exports = function (app) {
  var route = express.Router()

  app.use('/', route)

  route.post('/check-for-automatic-processing', function (req, res) {
    var result = claimChecker.checkForAutomaticProcessing(req.body)
    if (result) {
      res.status(200).json(result)
    } else {
      res.status(500).json({error: {message: 'Invalid claim'}})
    }
  })
}
