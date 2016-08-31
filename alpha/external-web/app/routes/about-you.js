/**
 * This file defines all routes for the about-you page.
 */
var router = require('../routes')

// A client used to make database calls.
var client = require('../eligibility-client')

var log4js = require('../log4js')
var LOGGER = log4js.getLogger('about-you')

var PENDING = 'PENDING'

/**
 * Render the about you page.
 *
 * Example call: http://localhost:3000/about-you
 */
router.get('/about-you', function (request, response) {
  LOGGER.debug('GET route: /about-you')
  response.render('about-you')
})

/**
 * Render the about you page with an existing claimant's details if they exist.
 *
 * Example call: http://localhost:3000/about-you/57c3f1139e03be003bfac1aa
 */
router.get('/about-you/:claimant_id', function (request, response) {
  var id = request.params.claimant_id
  LOGGER.debug('GET route: /about-you/' + id)

  client.get(id, function (error, claimant) {
    if (!error) {
      LOGGER.info('Successfully retrieved claimant with id: ' + id)
      response.render('about-you', { 'claimant': claimant })
    } else {
      LOGGER.error('Failed to retrieve claimant with id: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})

/**
 * Save a single claimant to the system.
 *
 * Example call: http://localhost:3000/about-you
 */
router.post('/about-you', function (request, response) {
  LOGGER.debug('POST route: /about-you')

  client.save(request.body, function (error, claimant) {
    if (!error) {
      LOGGER.info('Successfully saved new claimant: ' + claimant)
      response.redirect('/relationship/' + request.body._id)
    } else {
      LOGGER.error('Failed to save new claimant.')
      response.status(500).render('error', { message: error.message, error: error })
    }
  })

  // Set statuses for claimant application.
  var statuses = {
    applicationStatus: PENDING,
    incomeVerificationStatus: PENDING,
    relationshipVerificationStatus: PENDING
  }

  // Save the statues for the application, NOMIS, and DWP checks.
  var id = request.body._id
  client.updateField(id, 'status', statuses, function (error, claimant) {
    if (!error) {
      LOGGER.info('Successfully saved status for claimant with id: ' + id)
    } else {
      LOGGER.error('Failed to update claimant with id: ' + id)
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
  LOGGER.debug('POST route: /about-you/' + id)

  client.update(id, request.body, function (error, claimant) {
    if (!error) {
      LOGGER.info('Successfully updated claimant with id: ' + id)
      response.redirect('/relationship/' + id)
    } else {
      LOGGER.error('Failed to update claimant with id: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})
