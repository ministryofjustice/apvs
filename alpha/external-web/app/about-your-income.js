/**
 * This file defines all routes for the about-your-income page.
 */
var router = require('./routes');

// Require file upload library.
var multer = require('multer')
var upload = multer({ dest: 'eligibility-uploads/' })

/**
 * Render the about you income page.
 */
router.get('/about-your-income', function (request, response) {
  response.render('about-your-income')
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
