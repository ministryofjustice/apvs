/**
 * This file defines all routes for the about-you page.
 */
var router = require('../routes')

// A client used to make database calls.
var client = require('../eligibility-client')

var PENDING = 'PENDING'

/**
 * Render the about you page.
 *
 * Example call: http://localhost:3000/about-you
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
  var id = request.params.claimant_id
  console.log('GET /about-you/' + id + ' called.')

  client.get(id, function (error, claimant) {
    if (!error) {
      console.log('Successfully retrieved claimant with id: ' + id)
      response.render('about-you', { 'claimant': claimant })
    } else {
      console.log('Failed to retrieve claimant with id: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})

/**
 * Save a single claimant to the system. Include their statuses at this point to ensure they always exist for every
 * claimant.
 *
 * Example call: http://localhost:3000/about-you
 */
router.post('/about-you', function (request, response) {
  console.log('POST route: /about-you')

  var claimant = {
    personal: request.body,
    status: {
      applicationStatus: PENDING,
      incomeVerificationStatus: PENDING,
      relationshipVerificationStatus: PENDING
    }
  }

  client.save(claimant, function (error, claimant) {
    if (!error) {
      console.log('Successfully saved new claimant: ' + claimant.ops[0])
      response.redirect('/relationship/' + claimant.ops[0]._id)
    } else {
      console.log('Failed to save new claimant.')
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})

/**
 * Update a single existing claimant.
 *
 * Example call: http://localhost:3000/about-you/57c3f1139e03be003bfac1aa
 */
router.post('/about-you/:claimant_id', function (request, response) {
  var id = request.params.claimant_id
  console.log('POST /about-you/' + id + ' called.')

  var claimant = {
    personal: request.body
  }

  client.update(id, claimant, function (error, claimant) {
    if (!error) {
      console.log('Successfully updated claimant with id: ' + id)
      response.redirect('/relationship/' + id)
    } else {
      console.log('Failed to update claimant with id: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})
