var router = require('../routes')
var client = require('../services/eligibility-client')
var eligibilityFlag = require('../services/eligibility-flag')
var logger = require('../services/bunyan-logger')
var validator = require('../services/validators/about-you-validator.js')

var PENDING = 'PENDING'
const claimantsCollection = 'claimants'

router.get('/about-you', function (request, response, next) {
  response.render('about-you')
  next()
})

router.get('/about-you/:claimant_id', function (request, response, next) {
  client.get(request.params.claimant_id, claimantsCollection)
    .then(function (claimant) {
      response.render('about-you', { 'claimant': claimant })
    })
    .catch(function (error) {
      response.status(500).render('error', { error: error })
    })
  next()
})

router.post('/about-you', function (request, response, next) {
  if (validator.validationErrors(request, response, next)) {
    return
  }

  save(null, request, response)
  next()
})

router.post('/about-you/:claimant_id', function (request, response, next) {
  if (validator.validationErrors(request, response, next)) {
    return
  }

  var id = request.params.claimant_id
  eligibilityFlag.get(id, claimantsCollection)
    .then(function (isEligibilityModified) {
      if (isEligibilityModified) {
        logger.info('This is a modification of an eligibility application. Saving new record.')
        save(id, request, response)
      } else {
        logger.info('This is a brand new eligibility application.')
        update(id, request, response)
      }
    })
    .catch(function (error) {
      response.status(500).render('error', { error: error })
    })
  next()
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

  client.save(claimant, claimantsCollection)
    .then(function (claimant) {
      updateEligibilityFlag(id, claimant._id)
      response.redirect('/relationship/' + claimant._id)
    })
    .catch(function (error) {
      response.status(500).render('error', { error: error })
    })
}

function update (id, request, response) {
  var claimant = {
    personal: request.body
  }

  client.update(id, claimant, claimantsCollection)
    .then(function () {
      response.redirect('/relationship/' + id)
    })
    .catch(function (error) {
      response.status(500).render('error', { error: error })
    })
}

// If we were directed here from the claim page mark the new eligibility claim as being a modification.
function updateEligibilityFlag (id, newID) {
  if (id) {
    eligibilityFlag.get(id, claimantsCollection)
      .then(function (isEligibilityModified) {
        if (isEligibilityModified) {
          eligibilityFlag.update(newID, 'Yes', claimantsCollection)
        }
      })
  }
}
