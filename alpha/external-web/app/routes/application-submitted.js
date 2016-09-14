var router = require('../routes')
var client = require('../services/eligibility-client')
var logger = require('../services/bunyan-logger')

const tasksCollection = 'tasks'
const claimantsCollection = 'claimants'

router.get('/application-submitted/:claimant_id', function (request, response, next) {
  client.get(request.params.claimant_id, claimantsCollection)
    .then(function (claimant) {
      var reference = 'APVS' + getRandomReference()
      createNotificationTask(reference, claimant.personal.email)
      response.render('application-submitted', { reference: reference })
    })
    .catch(function (error) {
      response.status(500).render('error', { error: error })
    })
  next()
})

var getRandomReference = function () {
  return Math.floor(Math.random() * 90000) + 10000
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
