/**
 * This file defines all routes for the about-you page.
 */
var router = require('../routes')

// TODO: Should be included in a controller file rather than by each routes file.
var mongo = require('../database')

/**
 * Save a single claimant to the system.
 */
router.post('/about-you', function (request, response) {
  mongo.db.collection('claimants').insertOne(request.body, function (error, result) {
    if (!error) {
      response.render('relationship')
    }
  })
})
