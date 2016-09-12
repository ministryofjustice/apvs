var router = require('../routes')
var client = require('../services/eligibility-client')
var eligibilityFlag = require('../services/eligibility-flag')
var logger = require('../services/bunyan-logger')

var PENDING = 'PENDING'

router.get('/about-you', function (request, response, next) {
  response.render('about-you')
  next()
})

router.get('/about-you/:claimant_id', function (request, response, next) {
  client.get(request.params.claimant_id)
    .then(function (claimant) {
      response.render('about-you', { 'claimant': claimant })
    })
    .catch(function (error) {
      response.status(500).render('error', { error: error })
    })
  next()
})

router.post('/about-you', function (request, response, next) {
  save(null, request, response)
  next()
})

router.post('/about-you/:claimant_id', function (request, response, next) {
  var id = request.params.claimant_id
  eligibilityFlag.get(id, function (isEligibilityModified) {
    if (isEligibilityModified) {
      logger.info('This is a modification of an eligibility application. Saving new record.')
      save(id, request, response)
      next()
    } else {
      logger.info('This is a brand new eligibility application.')
      update(id, request, response)
      next()
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
    } else {
      response.status(500).render('error', { message: error.message, error: error })
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

  client.update(id, claimant, function (error) {
    if (!error) {
      response.redirect('/relationship/' + id)
    } else {
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
}
