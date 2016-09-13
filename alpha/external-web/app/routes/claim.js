var router = require('../routes')
var eligibilityFlag = require('../services/eligibility-flag')
var reference = require('../services/reference-checker')

const claimantsCollection = 'claimants'

router.get('/claim', function (request, response, next) {
  response.render('claim')
  next()
})

router.post('/claim', function (request, response, next) {
  var id = request.body.reference
  var eligibility = request.body.isEligibilityModified

  if (!eligibility) {
    response.status(500).render('error', { error: 'Request Failed! Please fully complete the form.' })
    next()
    return
  }

  reference.isValid(id, claimantsCollection)
    .then(function (isValid) {
      if (!isValid) {
        response.redirect('/')
      } else {
        eligibilityFlag.update(id, eligibility, claimantsCollection)
        if (eligibilityFlag.isModified(eligibility)) {
          response.redirect('/about-you/' + id)
        }
      }
      response.redirect('/claim-details/' + id)
      next()
    })
})
