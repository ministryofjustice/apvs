var express = require('express')
var mongo = require('./database');
var router = express.Router()
var multer = require('multer')

var upload = multer({ dest: 'eligibility-uploads/' })

module.exports = router

/**
 * Render the landing page.
 */
router.get('/', function (req, res) {
  res.render('index')
})

/**
 * Save a single claimant to the system.
 */
router.post('/application_form', function (request, response) {
  mongo.db.collection('claimants').insertOne(request.body, function (error, result) {
    if (!error) {
      response.render('add_user_success')
    }
  })
})

/**
 * Render the about you income page.
 */
router.get('/about-your-income', function (req, res) {
  res.render('about-your-income')
})

/**
 * Upload a single file to the system.
 */
router.post('/about-your-income', upload.single('evidence'), function (req, res) {
  if (req.file) {
    var metadata = {
      eligibilityId: req.file.filename, // using filename guild for temp id
      // TODO: This should tie to a real claimant id.
      claimId: null,
      originalFilename: req.file.originalname,
      path: req.file.path
    }

    mongo.db.collection('supporting-document').insertOne(metadata, function (err, result) {
      if (!err) {
        console.log('Successfully saved file.');
      }
    })
  }

  // TODO: validation

  res.redirect('/application-submitted')
})

router.get('/application-submitted', function (req, res) {
  res.render('application-submitted')
})