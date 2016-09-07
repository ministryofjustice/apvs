var router = require('../routes')
var eligibilityFlag = require('../services/eligibility-flag')
var reference = require('../services/reference-checker')
var logger = require('../services/bunyan-logger').logger

router.get('/claim', function (request, response) {
  logger.info({request: request})
  response.render('claim')
})

router.post('/claim', function (request, response) {
  logger.info({request: request})

  var id = request.body.reference
  var eligibility = request.body.isEligibilityModified

  if (!eligibility) {
    logger.error('Claim Submit Failed! Form was not complete.')
    return response.status(500).render('error', { error: 'Request Failed! Please fully complete the form.' })
  }

  reference.isValid(id, function (isValid) {
    if (!isValid) {
      logger.error('Claim Submit Failed! Reference ' + id + ' was not valid.')
      return response.redirect('/index')
    }
    eligibilityFlag.update(id, eligibility)

    if (eligibilityFlag.isModified(eligibility)) {
      return response.redirect('/about-you/' + id)
    }
    return response.redirect('/claim-details/' + id)
  })
})
