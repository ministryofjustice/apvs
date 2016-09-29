var validator = require('../services/validators/about-you-validator.js')
var client = require('../services/database/eligibility-client')
var eligibilityFlag = require('../services/eligibility-flag')
var logger = require('../services/bunyan-logger')

const PENDING = 'PENDING'
const CLAIMANTS_COLLECTION = 'claimants'

var claimant

module.exports = function (router) {
  router.get('/about-you', function (request, response, next) {
    response.render('about-you')
    next()
  })

  router.get('/about-you/:claimant_id', function (request, response, next) {
    client.get(request.params.claimant_id, CLAIMANTS_COLLECTION)
      .then(function (claimant) {
        response.render('about-you', { 'claimant': claimant })
      })
      .catch(function (error) {
        response.status(500).render('error', { error: error })
      })
    next()
  })

  router.post('/about-you', function (request, response, next) {
    var validationErrors = validator(request.body)

    claimant = {
      'personal': request.body
    }
    if (validationErrors) {
      response.status(400).render('about-you', { errors: validationErrors, 'claimant': claimant })
      next()
      return
    }

    claimant['status'] = {
      applicationStatus: PENDING,
      incomeVerificationStatus: PENDING,
      relationshipVerificationStatus: PENDING
    }

    var id = null
    client.save(claimant, CLAIMANTS_COLLECTION)
      .then(function (claimant) {
        updateEligibilityFlag(id, claimant._id)
        response.redirect('/relationship/' + claimant._id)
      })
      .catch(function (error) {
        response.status(500).render('error', { error: error })
      })

    next()
  })

  router.post('/about-you/:claimant_id', function (request, response, next) {
    var id = request.params.claimant_id
    var validationErrors = validator(request.body)

    claimant = {
      'personal': request.body
    }

    if (validationErrors) {
      claimant['_id'] = id
      response.status(400).render('about-you', { errors: validationErrors, 'claimant': claimant })
      next()
      return
    }

    eligibilityFlag.get(id, CLAIMANTS_COLLECTION)
      .then(function (isEligibilityModified) {
        if (isEligibilityModified) {
          logger.info('This is a modification of an eligibility application. Saving new record.')

          claimant['status'] = {
            applicationStatus: PENDING,
            incomeVerificationStatus: PENDING,
            relationshipVerificationStatus: PENDING
          }

          client.save(claimant, CLAIMANTS_COLLECTION)
            .then(function (claimant) {
              updateEligibilityFlag(id, claimant._id)
              response.redirect('/relationship/' + claimant._id)
            })
            .catch(function (error) {
              response.status(500).render('error', { error: error })
            })
        } else {
          logger.info('This is a brand new eligibility application.')

          client.update(id, claimant, CLAIMANTS_COLLECTION)
            .then(function () {
              response.redirect('/relationship/' + id)
            })
            .catch(function (error) {
              response.status(500).render('error', { error: error })
            })
        }
      })
      .catch(function (error) {
        response.status(500).render('error', { error: error })
      })
    next()
  })
}

// If we were directed here from the claim page mark the new eligibility claim as being a modification.
function updateEligibilityFlag (id, newID) {
  if (id) {
    eligibilityFlag.get(id, CLAIMANTS_COLLECTION)
      .then(function (isEligibilityModified) {
        if (isEligibilityModified) {
          eligibilityFlag.update(newID, 'Yes', CLAIMANTS_COLLECTION)
        }
      })
  }
}

