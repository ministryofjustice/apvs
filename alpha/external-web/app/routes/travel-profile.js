var router = require('../routes')
var client = require('../services/eligibility-client')
var eligibilityFlag = require('../services/eligibility-flag')
var logger = require('../services/bunyan-logger')

const claimantsCollection = 'claimants'
const tasksCollection = 'tasks'

router.get('/travel-profile/:claimant_id', function (request, response, next) {
  client.get(request.params.claimant_id, claimantsCollection)
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

  client.update(id, travelProfile, claimantsCollection)
    .then(function () {
      logger.info('Successfully updated travel profile for claimant with id: %s', id)
      var reference = 'APVS' + getRandomReference()
      createNotificationTask(reference)
      isEligibilityModified(id, response, reference)
    })
    .catch(function (error) {
      response.status(500).render('error', { error: error })
    })
  next()
})

// Determine if the eligibility application is a modification and redirect accordingly.
function isEligibilityModified (id, response, reference) {
  eligibilityFlag.get(id, claimantsCollection)
    .then(function (isEligibilityModified) {
      if (isEligibilityModified) {
        response.redirect('/claim-details/' + id)
      } else {
        response.redirect('/application-submitted/' + reference)
      }
    })
    .catch(function (error) {
      response.status(500).render('error', { error: error })
    })
}

var createNotificationTask = function (reference, email) {
  var task = {
    name: 'application-notification',
    status: 'PENDING',
    action: {
      method: 'email',
      reference: reference,
      email: email || 'test@test.com'
    }
  }

  client.save(task, tasksCollection)
    .then(function (claimant) {})
    .catch(function (error) {
      logger.error(error)
    })
}

var getRandomReference = function () {
  return Math.floor(Math.random() * 90000) + 10000
}
