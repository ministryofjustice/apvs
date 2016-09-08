var router = require('../routes')
var client = require('../services/eligibility-client')
var eligibilityFlag = require('../services/eligibility-flag')
var logger = require('../services/bunyan-logger')

router.get('/travel-profile/:claimant_id', function (request, response, next) {
  var id = request.params.claimant_id
  client.get(id, function (error, claimant) {
    if (!error) {
      response.render('travel-profile', { 'claimant': claimant })
      next()
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      next()
    }
  })
})

router.post('/travel-profile/:claimant_id', function (request, response, next) {
  var id = request.params.claimant_id
  var travelProfile = {
    'travel-profile': request.body
  }

  client.update(id, travelProfile, function (error, claimant) {
    if (!error) {
      logger.info('Successfully updated travel profile for claimant with id: %s', id)
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      next()
    }
  })

  eligibilityFlag.get(id, function (isEligibilityModified) {
    if (isEligibilityModified) {
      response.redirect('/claim-details/' + id)
      next()
    } else {
      response.redirect('/application-submitted')
      next()
    }
  })
})
