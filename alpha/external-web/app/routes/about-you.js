/**
 * This file defines all routes for the about-you page.
 */
var router = require('../routes')

// TODO: Should be included in a controller file rather than by each routes file.
var mongo = require('../database')

/**
 * Render the about you page.
 */
router.get('/about-you', function (request, response) {
  console.log('GET /about-you called.')
  response.render('about-you')
})

/**
 * Render the about you page with an existing claimant's details if they exist.
 *
 * Example call: http://localhost:3000/about-you/57c3f1139e03be003bfac1aa
 */
router.get('/about-you/:claimant_id', function (request, response) {
  var id = new mongo.client.ObjectID(request.params.claimant_id)
  console.log('GET /about-you/' + id + ' called.')

  mongo.db.collection('claimants').findOne({ _id: id }, function (error, claimant) {
    if (!error) {
      response.render('about-you', { 'claimant': claimant })
    }
  })
})

/**
 * Save a single claimant to the system.
 */
router.post('/about-you', function (request, response) {
  console.log('POST /about-you called.')
  mongo.db.collection('claimants').insertOne(request.body, function (error, result) {
    if (!error) {
      response.redirect('/relationship')
    }
  })
})

/**
 * Update a single existing claimant.
 *
 * Example call: http://localhost:3000/about-you/57c3f1139e03be003bfac1aa
 */
router.post('/about-you/:claimant_id', function (request, response) {
  var id = new mongo.client.ObjectID(request.params.claimant_id)
  console.log('POST /about-you/' + id + ' called.')

  mongo.db.collection('claimants').updateOne({ _id: id }, request.body, function (error, result) {
    if (!error) {
      response.redirect('/relationship/' + id)
    }
  })
})
