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
 * Save a single claimant to the system. Include their statuses at this point to ensure they always exist for every
 * claimant.
 *
 * Example call: http://localhost:3000/about-you
 */
router.post('/about-you', function (request, response) {
  LOGGER.debug('POST route: /about-you')

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
      LOGGER.info('Successfully saved new claimant: ' + claimant.ops[0])
      response.redirect('/relationship/' + claimant.ops[0]._id)
    } else {
      LOGGER.error('Failed to save new claimant.')
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
