var router = require('../routes')
var client = require('../eligibility-client')
<<<<<<< HEAD
=======
var eligibilityFlag = require('../services/eligibility-flag')
var logger = require('../services/bunyan-logger').logger
>>>>>>> develop

// Require file upload library.
var multer = require('multer')
var upload = multer({ dest: 'eligibility-uploads/' })

router.get('/about-your-income/:claimant_id', function (request, response) {
  logger.info({request: request})

  var id = request.params.claimant_id
  client.get(id, function (error, claimant) {
    if (!error) {
      response.render('about-your-income', { 'claimant': claimant })
      logger.info({response: response}, 'Successfully retrieved claimant with id: %s', id)
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      logger.error({response: response}, 'Failed to retrieve claimant with id: %s', id)
    }
  })
})

router.post('/about-your-income/:claimant_id', upload.single('evidence'), function (request, response) {
  logger.info({request: request})

  var id = request.params.claimant_id
  if (!request.file) {
    response.status(500).render('error', { error: 'Failed to update claimant with id: ' + id + '. No file was uploaded.' })
    logger.error({response: response}, 'Failed to update claimant with id: %s. No file was uploaded.', id)
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
        logger.info('Successfully updated claimant with id: %s', id)
      } else {
        response.status(500).render('error', { message: error.message, error: error })
        logger.error({response: response}, 'Failed to update claimant with id: %s', id)
      }
    })

    response.redirect('/travel-profile/' + id)
    logger.info({response: response}, 'Redirecting to travel profile')
  }
})
