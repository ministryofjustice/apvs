/**
 * This file defines all routes for the about-your-income page.
 */
var router = require('../routes')

// TODO: Should be included bu a controller file.
// Require file upload library.
var multer = require('multer')
var upload = multer({ dest: 'eligibility-uploads/' })

// TODO: Should be included in a controller file rather than by each routes file.
var mongo = require('../database')

/**
 * Render the about you about-your-income page and populate with the details of the claimant with the given ID.
 *
 * Example call: http://localhost:3000/about-your-income/57c3f1139e03be003bfac1aa
 */
router.get('/about-your-income/:claimant_id', function (request, response) {
  var id = new mongo.client.ObjectID(request.params.claimant_id)
  console.log('GET /about-your-income/' + id + ' called.')

  mongo.db.collection('claimants').findOne({ _id: id }, function (error, claimant) {
    if (!error) {
      response.render('about-your-income', { 'claimant': claimant })
    }
  })
})

/**
 * Upload a single file to the system and it's meta data to the database.
 *
 * Example call: http://localhost:3000/about-your-income/57c3f1139e03be003bfac1aa
 */
router.post('/about-your-income/:claimant_id', upload.single('evidence'), function (request, response) {
  var id = new mongo.client.ObjectID(request.params.claimant_id)
  console.log('POST /about-your-income/' + id + ' called.')

  // Bundle the file meta data into an object.
  if (request.file) {
    var metadata = {
      eligibilityId: request.file.filename, // using filename guild for temp id
      originalFilename: request.file.originalname,
      path: request.file.path
    }

    // Save the uploaded files meta data to the claimant.
    mongo.db.collection('claimants').updateOne({ _id: id }, { $set: metadata }, function (error, result) {
      console.log(result)
      if (!error) {
        console.log('Successfully saved file meta data.')
      }
    })
  }

  // TODO: validation

  response.redirect('/application-submitted')
})
