var router = require('../routes')
var eligibilityFlag = require('../services/eligibility-flag')
var reference = require('../services/reference-checker')

router.get('/claim', function (request, response) {
  console.log('GET /claim')
  response.render('claim')
})

router.post('/claim', function (request, response) {
  console.log('POST /claim/ called.')

  var id = request.body.reference
  var eligibility = request.body.isEligibilityModified

  if (!eligibility) {
    console.log('Claim Submit Failed! Form was not complete.')
    return response.status(500).render('error', { error: 'Request Failed! Please fully complete the form.' })
  }

  reference.isValid(id, function (isValid) {
    if (!isValid) {
      console.log('Claim Submit Failed! Reference ' + id + ' was not valid.')
      return response.redirect('/index')
    }
    eligibilityFlag.update(id, eligibility)

    if (eligibilityFlag.isModified(eligibility)) {
      return response.redirect('/about-you/' + id)
    }
    return response.redirect('/claim-details/' + id)
  })
})
