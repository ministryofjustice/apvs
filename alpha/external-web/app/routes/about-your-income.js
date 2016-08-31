/**
 * This file defines all routes for the about-your-income page.
 */
var router = require('../routes')

// Require file upload library.
var multer = require('multer')
var upload = multer({ dest: 'eligibility-uploads/' })

// A client used to make database calls.
var client = require('../eligibility-client')

/**
 * Render the about you about-your-income page and populate with the details of the claimant with the given ID.
 *
 * Example call: http://localhost:3000/about-your-income/57c3f1139e03be003bfac1aa
 */
router.get('/about-your-income/:claimant_id', function (request, response) {
  var id = request.params.claimant_id
  console.log('GET /about-your-income/' + id + ' called.')

  client.get(id, function (error, claimant) {
    if (!error) {
      console.log('Successfully retrieved claimant with id: ' + id)
      response.render('about-your-income', { 'claimant': claimant })
    } else {
      console.log('Failed to retrieve claimant with id: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})

/**
 * Upload a single file to the system and it's meta data to the database.
 *
 * Example call: http://localhost:3000/about-your-income/57c3f1139e03be003bfac1aa
 */
router.post('/about-your-income/:claimant_id', upload.single('evidence'), function (request, response) {
  var id = request.params.claimant_id
  console.log('POST /about-your-income/' + id + ' called.')

  // Bundle the file meta data into an object.
  if (request.file) {
    var metadata = {
      eligibilityId: request.file.filename,
      originalFilename: request.file.originalname,
      path: request.file.path
    }

    // Save the uploaded files meta data to the claimant.
    client.embeddedUpdate(id, 'eligibility-file', metadata, function (error, claimant) {
      if (!error) {
        console.log('Successfully updated claimant with id: ' + id)
      } else {
        console.log('Failed to update claimant with id: ' + id)
        response.status(500).render('error', { message: error.message, error: error })
      }
    })

    // Save the claimants benefits form selection.
    client.embeddedUpdate(id, 'benefits', request.body, function (error, claimant) {
      if (!error) {
        console.log('Successfully updated claimant with id: ' + id)
      } else {
        console.log('Failed to update claimant with id: ' + id)
        response.status(500).render('error', { message: error.message, error: error })
      }
    })

    // Set statuses for claimant application.
    var statuses = {
      applicationStatus: 'pending',
      incomeVerificationStatus: 'pending',
      relationshipVerificationStatus: 'pending'
    }

    // Save the statues for the application, NOMIS, and DWP checks.
    client.embeddedUpdate(id, 'status', statuses, function (error, claimant) {
      if (!error) {
        console.log('Successfully saved status for claimant with id: ' + id)
      } else {
        console.log('Failed to update claimant with id: ' + id)
        response.status(500).render('error', { message: error.message, error: error })
      }
    })
  } else {
    console.log('Failed to update claimant with id: ' + id + '. No file was uploaded.')
  }
  response.redirect('/application-submitted')
})
