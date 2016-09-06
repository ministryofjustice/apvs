var router = require('../routes')
var eligibilityFlag = require('../services/eligibility-flag')

router.get('/claim', function (request, response) {
  console.log('GET /claim')
  response.render('claim')
})

router.post('/claim', function (request, response) {
  console.log('POST /claim/ called.')

  var id = request.body.reference
  var eligibility = request.body.isEligibilityModified

  // If the form was not completed display an error message.
  if (!id || !eligibility) {
    console.log('Request Failed! Please fully complete the form.')
    response.status(500).render('error', { error: 'Request Failed! Please fully complete the form.' })
  } else {
    eligibilityFlag.update(id, eligibility)

    // Redirect the user based on the response to the details changed question.
    if (eligibilityFlag.isModified(eligibility)) {
      response.redirect('/about-you/' + id)
    } else {
      response.redirect('/claim-details/' + id)
    }
  }
})
