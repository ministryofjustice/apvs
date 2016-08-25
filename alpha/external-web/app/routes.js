var express = require('express')
var mongo = require('./database');
var router = express.Router()

module.exports = router

/**
 * Render the landing page.
 */
router.get('/', function (req, res) {
  res.render('index')
})

/**
 * Save a single claimant to the system.
 */
router.post('/application_form', function (request, response) {
  mongo.db.collection('claimants').save(request.body, function (error, result) {
    if (!error) {
      response.render('add_user_success')
    }
  })
})