var router = require('../routes')
var client = require('../services/eligibility-client')
var eligibilityFlag = require('../services/eligibility-flag')
var logger = require('../services/bunyan-logger').logger

router.get('/travel-profile/:claimant_id', function (request, response) {
  logger.info({request: request})

  var id = request.params.claimant_id
  client.get(id, function (error, claimant) {
    if (!error) {
      response.render('travel-profile', { 'claimant': claimant })
      logger.info({response: response}, 'Successfully retrieved claimant with id: %s', id)
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      logger.info({response: response}, 'Failed to retrieve claimant with id: %s', id)
    }
  })
})

router.post('/travel-profile/:claimant_id', function (request, response) {
  logger.info({response: response})

  var id = request.params.claimant_id
  var travelProfile = {
    'travel-profile': request.body
  }

  client.update(id, travelProfile, function (error, claimant) {
    if (!error) {
      logger.info({response: response}, 'Successfully updated travel profile for claimant with id: %s', id)
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      logger.error({response: response}, 'Failed to update travel profile for claimant with id: %s', id)
    }
  })

  eligibilityFlag.get(id, function (isEligibilityModified) {
    if (isEligibilityModified) {
      response.redirect('/claim-details/' + id)
      logger.info({response: response}, 'Modified eligibility application submitted successfully. Redirecting user to claim details.')
    } else {
      response.redirect('/application-submitted')
      logger.info({response: response}, 'New eligibility application submitted successfully. Redirecting user to success page.')
    }
  })
})
