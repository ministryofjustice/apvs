var router = require('../routes')
var client = require('../services/eligibility-client')
var logger = require('../services/bunyan-logger')

// Require file upload library.
var multer = require('multer')
var upload = multer({ dest: 'visit-stamp-uploads/' })

const claimantsCollection = 'claimants'

router.get('/declare-your-visit/:claimant_id', function (request, response, next) {
  client.get(request.params.claimant_id, claimantsCollection)
    .then(function (claimant) {
      response.render('declare-your-visit', { 'claimant': claimant })
    })
    .catch(function (error) {
      response.status(500).render('error', { message: error.message, error: error })
    })
  next()
})

router.post('/declare-your-visit/:claimant_id', upload.single('stamp'), function (request, response, next) {
  var id = request.params.claimant_id
  client.get(id, claimantsCollection)
    .then(function (claimant) {
      var stampReceived = request['body']['visit-stamp-received']
      var visitStampDetails = {
        'visit-stamp-received': stampReceived
      }

      if (stampReceived === 'Yes') {
        if (request.file) {
          visitStampDetails['visit-stamp-file'] = buildStampDetails(request)
        } else {
          response.status(500).render('error', { error: 'Failed to update claimant with id: ' + id + '. No file was uploaded.' })
          next()
          return
        }
      }
      updateStampDetails(id, visitStampDetails, response)
    })
    .catch(function (error) {
      response.status(500).render('error', { message: error.message, error: error })
    })
  next()
})

function updateStampDetails (id, visitStampDetails, response) {
  client.update(id, visitStampDetails, claimantsCollection)
    .then(function () {
      logger.info('Successfully updated claimant with id: %s', id)
      response.redirect('/submit-claim/' + id)
    })
    .catch(function (error) {
      response.status(500).render('error', { message: error.message, error: error })
    })
}

function buildStampDetails (request) {
  return {
    visitStampId: request.file.filename,
    originalFilename: request.file.originalname,
    path: request.file.path
  }
}
