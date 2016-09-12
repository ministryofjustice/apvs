var router = require('../routes')
var client = require('../services/eligibility-client')
var eligibilityFlag = require('../services/eligibility-flag')
var logger = require('../services/bunyan-logger')

router.get('/travel-profile/:claimant_id', function (request, response, next) {
  client.get(request.params.claimant_id)
    .then(function (claimant) {
      response.render('travel-profile', { 'claimant': claimant })
    })
    .catch(function (error) {
      response.status(500).render('error', { error: error })
    })
  next()
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
    }
  })
  isEligibilityModified(id, response, next)
})

// Determine if the eligibility application is a modification and redirect accordingly.
function isEligibilityModified (id, response, next) {
  eligibilityFlag.get(id)
    .then(function (isEligibilityModified) {
      if (isEligibilityModified) {
        response.redirect('/claim-details/' + id)
      } else {
        response.redirect('/application-submitted')
      }
    })
    .catch(function (error) {
      response.status(500).render('error', { error: error })
    })
  next()
}
