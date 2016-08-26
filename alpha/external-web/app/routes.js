var express = require('express')
var mongo = require('./database')
var router = express.Router()

module.exports = router

// Include custom route files.
require('./relationship');
require('./escorts');
require('./about-your-income');
require('./application-submitted');

/**
 * Render the landing page.
 */
router.get('/', function (request, response) {
  response.render('index')
})

/**
 * Save a single claimant to the system.
 */
router.post('/about-you', function (request, response) {
  mongo.db.collection('claimants').insertOne(request.body, function (error, result) {
    if (!error) {
      response.render('add-user-success')
    }
  })
})
