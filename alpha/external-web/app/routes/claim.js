var router = require('../routes')
var eligibilityFlag = require('../services/eligibility-flag')
var reference = require('../services/reference-checker')
var logger = require('../services/bunyan-logger').logger

router.get('/claim', function (request, response) {
  logger.info({request: request})
  response.render('claim')
  logger.info({response: response})
})

router.post('/claim', function (request, response) {
  logger.info({request: request})

  var id = request.body.reference
  var eligibility = request.body.isEligibilityModified

  if (!eligibility) {
    response.status(500).render('error', { error: 'Request Failed! Please fully complete the form.' })
    logger.error({response: response}, 'Claim Submit Failed! Form was not complete.')
    return
  }

  reference.isValid(id, function (isValid) {
    if (!isValid) {
      response.redirect('/index')
      logger.error({response: response}, 'Claim Submit Failed! Reference %s was not valid.', id)
      return
    }
    eligibilityFlag.update(id, eligibility)

    if (eligibilityFlag.isModified(eligibility)) {
      response.redirect('/about-you/' + id)
      logger.error({response: response}, 'Eligibility claim with reference %s has been modified redirecting to eligibility application.', id)
      return
    }
    response.redirect('/claim-details/' + id)
    logger.error({response: response}, 'Eligibility claim with reference %s has not been modified proceeding to claim details.', id)
  })
})
