/**
 * This file defines all routes for the about-your-income page.
 */
var router = require('../routes')

// Require file upload library.
var multer = require('multer')
var upload = multer({ dest: 'eligibility-uploads/' })

// A client used to make database calls.
var client = require('../eligibility-client')

var log4js = require('../log4js')
var LOGGER = log4js.getLogger('about-your-income')

/**
 * Render the about you about-your-income page and populate with the details of the claimant with the given ID.
 *
 * Example call: http://localhost:3000/about-your-income/57c3f1139e03be003bfac1aa
 */
router.get('/about-your-income/:claimant_id', function (request, response) {
  var id = request.params.claimant_id
  LOGGER.debug('GET /about-your-income/' + id + ' called.')

  client.get(id, function (error, claimant) {
    if (!error) {
      LOGGER.info('Successfully retrieved claimant with id: ' + id)
      response.render('about-your-income', { 'claimant': claimant })
    } else {
      LOGGER.error('Failed to retrieve claimant with id: ' + id)
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
  LOGGER.debug('POST /about-your-income/' + id + ' called.')

  if (!request.file) {
    LOGGER.error('Failed to update claimant with id: ' + id + '. No file was uploaded.')
    response.status(500).render('error', { error: 'Failed to update claimant with id: ' + id + '. No file was uploaded.' })
  } else {
    var incomeDetails = {
      'eligibility-file': {
        eligibilityId: request.file.filename,
        originalFilename: request.file.originalname,
        path: request.file.path
      },
      'benefits': request.body
    }

    client.update(id, incomeDetails, function (error, claimant) {
      if (!error) {
        LOGGER.info('Successfully updated claimant with id: ' + id)
        response.redirect('/application-submitted')
      } else {
        LOGGER.error('Failed to update claimant with id: ' + id)
        response.status(500).render('error', { message: error.message, error: error })
      }
    })
  }
})
