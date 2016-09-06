var router = require('../routes')
var client = require('../eligibility-client')

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
      console.log('Successfully saved new claimant: ' + claimant.ops[0])
      response.redirect('/relationship/' + claimant.ops[0]._id)
    } else {
      console.log('Failed to save new claimant.')
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})

router.post('/about-you/:claimant_id', function (request, response) {
  var id = request.params.claimant_id
  console.log('POST /about-you/' + id + ' called.')

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
})
