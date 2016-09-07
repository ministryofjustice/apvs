var router = require('../routes')
var client = require('../eligibility-client')
var eligibilityFlag = require('../services/eligibility-flag')

var PENDING = 'PENDING'

router.get('/about-you', function (request, response) {
  console.log('GET /about-you called.')
  response.render('about-you')
})

router.get('/about-you/:claimant_id', function (request, response) {
  var id = request.params.claimant_id
  console.log('GET /about-you/' + id + ' called.')

  client.get(id, function (error, claimant) {
    if (!error) {
      console.log('Successfully retrieved claimant with id: ' + id)
      response.render('about-you', { 'claimant': claimant })
    } else {
      console.log('Failed to retrieve claimant with id: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})

router.post('/about-you', function (request, response) {
  console.log('POST route: /about-you')
  save(null, request, response)
})

router.post('/about-you/:claimant_id', function (request, response) {
  var id = request.params.claimant_id
  console.log('POST /about-you/' + id + ' called.')

  eligibilityFlag.get(id, function (isEligibilityModified) {
    if (isEligibilityModified) {
      console.log('This is a modification of an eligibility application. Saving new record.')
      save(id, request, response)
    } else {
      console.log('This is a brand new eligibility application.')
      update(id, request, response)
    }
  })
})

function save (id, request, response) {
  var claimant = {
    personal: request.body,
    status: {
      applicationStatus: PENDING,
      incomeVerificationStatus: PENDING,
      relationshipVerificationStatus: PENDING
    }
  }

  client.save(claimant, function (error, claimant) {
    if (!error) {
      console.log('Successfully saved new claimant: ' + claimant)
      response.redirect('/relationship/' + claimant._id)
    } else {
      console.log('Failed to save new claimant.')
      response.status(500).render('error', { message: error.message, error: error })
    }

    // If we were directed here from the claim page mark the new eligibility claim as being a modification.
    if (id) {
      eligibilityFlag.get(id, function (isEligibilityModified) {
        if (isEligibilityModified) {
          eligibilityFlag.update(claimant._id, 'Yes')
        }
      })
    }
  })
}

function update (id, request, response) {
  var claimant = {
    personal: request.body
  }

  client.update(id, claimant, function (error, claimant) {
    if (!error) {
      console.log('Successfully updated claimant with id: ' + id)
      response.redirect('/relationship/' + id)
    } else {
      console.log('Failed to update claimant with id: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
}
