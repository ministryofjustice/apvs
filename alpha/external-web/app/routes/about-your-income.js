var router = require('../routes')
var client = require('../services/eligibility-client')
var logger = require('../services/bunyan-logger')

// Require file upload library.
var multer = require('multer')
var upload = multer({ dest: 'eligibility-uploads/' })

router.get('/about-your-income/:claimant_id', function (request, response, next) {
  client.get(request.params.claimant_id)
    .then(function (claimant) {
      response.render('about-your-income', { 'claimant': claimant })
    })
    .catch(function (error) {
      response.status(500).render('error', { error: error })
    })
  next()
})

router.post('/about-your-income/:claimant_id', upload.single('evidence'), function (request, response, next) {
  var id = request.params.claimant_id
  if (!request.file) {
    response.status(500).render('error', { error: 'Failed to update claimant with id: ' + id + '. No file was uploaded.' })
    next()
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
        next()
      }
    })

    response.redirect('/travel-profile/' + id)
    next()
  }
})
