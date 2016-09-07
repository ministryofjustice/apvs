var router = require('../routes')
var client = require('../services/eligibility-client')
var eligibilityFlag = require('../services/eligibility-flag')
var logger = require('../services/bunyan-logger').logger

var PENDING = 'PENDING'

router.get('/about-you', function (request, response) {
  logger.info({request: request})
  response.render('about-you')
  logger.info({response: response})
})

router.get('/about-you/:claimant_id', function (request, response) {
  logger.info({request: request})

  var id = request.params.claimant_id
  client.get(id, function (error, claimant) {
    if (!error) {
      response.render('about-you', { 'claimant': claimant })
      logger.info({response: response}, 'Successfully retrieved claimant with id: %s', id)
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      logger.error({response: response}, 'Failed to retrieve claimant with id: %s', id)
    }
  })
})

router.post('/about-you', function (request, response) {
  logger.info({request: request})
  save(null, request, response)
  logger.info({response: response})
})

router.post('/about-you/:claimant_id', function (request, response) {
  logger.info({request: request})

  var id = request.params.claimant_id
  eligibilityFlag.get(id, function (isEligibilityModified) {
    if (isEligibilityModified) {
      logger.info('This is a modification of an eligibility application. Saving new record.')
      save(id, request, response)
    } else {
      logger.info('This is a brand new eligibility application.')
      update(id, request, response)
    }
  })
})

function save (id, request, response) {
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
      response.redirect('/relationship/' + claimant._id)
      logger.info({response: response}, 'Successfully saved new claimant.')
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      logger.info({response: response}, 'Failed to save new claimant.')
    }

    // If we were directed here from the claim page mark the new eligibility claim as being a modification.
    if (id) {
      eligibilityFlag.get(id, function (isEligibilityModified) {
        if (isEligibilityModified) {
          eligibilityFlag.update(claimant._id, 'Yes')
        }
      })
    }
  })
}

function update (id, request, response) {
  var claimant = {
    personal: request.body
  }

  client.update(id, claimant, function (error, claimant) {
    if (!error) {
      response.redirect('/relationship/' + id)
      logger.info({response: response}, 'Successfully updated claimant with id: %s', id)
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      logger.error({response: response}, 'Failed to update claimant with id: %s', id)
    }
  })
}
