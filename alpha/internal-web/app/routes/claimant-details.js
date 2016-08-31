/**
 * This file defines all routes for the claimant-details page.
 */
var router = require('../routes')

// A client used to make database calls.
var client = require('../eligibility-client')

/**
 * Retrieve all claimants in the system.
 */
router.get('/claimant-details/:claimant_id', function (request, response) {
  var id = request.params.claimant_id
  console.log('GET /claimant-details/' + id + ' called.')

  client.get(id, function (error, claimant) {
    if (!error) {
      console.log('Successfully retrieved details for claimant with id: ' + id)
      response.render('claimant-details', { 'claimant': claimant })
    } else {
      console.log('Failed to retrieve claimant with id: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})

// TODO: These three methods should call a third as they all simply change a status.
router.post('/claimant-details/:claimant_id/approve', function (request, response) {
  var id = request.params.claimant_id
  console.log('GET /claimant-details/' + id + '/approve called.')

  var status = {
    'status.applicationStatus': 'APPROVED'
  }

  client.update(id, status, function (error, claimant) {
    if (!error) {
      console.log('Successfully changed claimants application status to APPROVED. ID: ' + id)
      response.redirect('/claimant-details/' + id)
    } else {
      console.log('Failed to change claimants application status to APPROVED. ID: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})

router.post('/claimant-details/:claimant_id/reject', function (request, response) {
  var id = request.params.claimant_id
  console.log('GET /claimant-details/' + id + '/reject called.')

  var status = {
    'status.applicationStatus': 'REJECTED'
  }

  client.update(id, status, function (error, claimant) {
    if (!error) {
      console.log('Successfully changed claimants application status to REJECTED. ID: ' + id)
      response.redirect('/claimant-details/' + id)
    } else {
      console.log('Failed to change claimants application status to REJECTED. ID: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})

router.post('/claimant-details/:claimant_id/escalate', function (request, response) {
  var id = request.params.claimant_id
  console.log('GET /claimant-details/' + id + '/escalate called.')

  var status = {
    'status.applicationStatus': 'ESCALATED'
  }

  client.update(id, status, function (error, claimant) {
    if (!error) {
      console.log('Successfully changed claimants application status to ESCALATED. ID: ' + id)
      response.redirect('/claimant-details/' + id)
    } else {
      console.log('Failed to change claimants application to ESCALATED. ID: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})
