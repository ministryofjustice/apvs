var router = require('../routes')
var client = require('../eligibility-client')
var eligibilityFlag = require('../services/eligibility-flag')

router.get('/travel-profile/:claimant_id', function (request, response) {
  var id = request.params.claimant_id
  console.log('GET /travel-profile/' + id + ' called.')

  client.get(id, function (error, claimant) {
    if (!error) {
      console.log('Successfully retrieved claimant with id: ' + id)
      response.render('travel-profile', { 'claimant': claimant })
    } else {
      console.log('Failed to retrieve claimant with id: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})

router.post('/travel-profile/:claimant_id', function (request, response) {
  var id = request.params.claimant_id
  console.log('POST /travel-profile/' + id + ' called.')

  var travelProfile = {
    'travel-profile': request.body
  }

  client.update(id, travelProfile, function (error, claimant) {
    if (!error) {
      console.log('Successfully updated travel profile for claimant with id: ' + id)
    } else {
      console.log('Failed to update travel profile for claimant with id: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }
  })

  eligibilityFlag.get(id, function (isEligibilityModified) {
    if (isEligibilityModified) {
      response.redirect('/claim-details/' + id)
    } else {
      response.redirect('/application-submitted')
    }
  })
})
