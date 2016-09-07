var router = require('../routes')
var client = require('../eligibility-client')
var eligibilityFlag = require('../services/eligibility-flag')
var logger = require('../services/bunyan-logger').logger

// Require file upload library.
var multer = require('multer')
var upload = multer({ dest: 'eligibility-uploads/' })

router.get('/about-your-income/:claimant_id', function (request, response) {
  logger.info({request: request})

  var id = request.params.claimant_id
  client.get(id, function (error, claimant) {
    if (!error) {
      logger.info('Successfully retrieved claimant with id: ' + id)
      response.render('about-your-income', { 'claimant': claimant })
    } else {
      logger.error('Failed to retrieve claimant with id: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})

router.post('/about-your-income/:claimant_id', upload.single('evidence'), function (request, response) {
  logger.info({request: request})

  var id = request.params.claimant_id
  if (!request.file) {
    logger.error('Failed to update claimant with id: ' + id + '. No file was uploaded.')
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
        logger.info('Successfully updated claimant with id: ' + id)
      } else {
        logger.error('Failed to update claimant with id: ' + id)
        response.status(500).render('error', { message: error.message, error: error })
      }
    })

    eligibilityFlag.get(id, function (isEligibilityModified) {
      if (isEligibilityModified) {
        response.redirect('/claim-details/' + id)
      } else {
        response.redirect('/application-submitted')
      }
    })
  }
})
