var express = require('express')
var mongo = require('./database')
var router = express.Router()
var multer = require('multer')

var upload = multer({ dest: 'eligibility-uploads/' })

module.exports = router

// Include custom route files.
require('./relationship');

/**
 * Render the landing page.
 */
router.get('/', function (request, response) {
  response.render('index')
})

/**
 * Render the about you income page.
 */
router.get('/about-your-income', function (request, response) {
  response.render('about-your-income')
})

/**
 * Render the application submitted page. Displayed after a successful file upload.
 */
router.get('/application-submitted', function (request, response) {
  response.render('application-submitted')
})

/**
 * Save a single claimant to the system.
 */
router.post('/about-you', function (request, response) {
  mongo.db.collection('claimants').insertOne(request.body, function (error, result) {
    if (!error) {
      response.render('add-user-success')
    }
  })
})

/**
 * Upload a single file to the system and it's meta data to the database.
 */
router.post('/about-your-income', upload.single('evidence'), function (request, response) {
  if (request.file) {
    var metadata = {
      eligibilityId: request.file.filename, // using filename guild for temp id
      claimantID: null, // TODO: This should tie to a real claimant id.
      originalFilename: request.file.originalname,
      path: request.file.path
    }

    // Save the uploaded files meta data to the database.
    mongo.db.collection('supporting-document').insertOne(metadata, function (error, result) {
      if (!error) {
        console.log('Successfully saved file meta data.')
      }
    })
  }

  // TODO: validation

  response.redirect('/application-submitted')
})
