var router = require('../routes')
var client = require('../services/eligibility-client')
var logger = require('../services/bunyan-logger')

// Require file upload library.
var multer = require('multer')
var upload = multer({ dest: 'eligibility-uploads/' })

router.get('/declare-your-visit/:claimant_id', function (request, response, next) {
  var id = request.params.claimant_id
  client.get(id, function (error, claimant) {
    if (!error) {
      response.render('declare-your-visit', { 'claimant': claimant })
      next()
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      next()
    }
  })
})

router.post('/declare-your-visit/:claimant_id', upload.single('stamp'), function (request, response, next) {
  var id = request.params.claimant_id
  client.get(id, function (error, claimant) {
    if (!error) {
      // only require a file upload if claimant declares they have a stamp
      var stampReceived = claimant['visit-stamp-received']
      if (stampReceived === 'Yes') {
        if (!request.file) {
          response.status(500).render('error', { error: 'Failed to update claimant with id: ' + id + '. No file was uploaded.' })
          next()
        } else {
          var visitStampDetails = {
            'visit-stamp-file': {
              visitStampId: request.file.filename,
              originalFilename: request.file.originalname,
              path: request.file.path
            },
            'visit-stamp-received': request['body']['visit-stamp-received']
          }

          client.update(id, visitStampDetails, function (error, claimant) {
            if (!error) {
              logger.info('Successfully updated claimant with id: %s', id)
            } else {
              response.status(500).render('error', { message: error.message, error: error })
              next()
            }
          })
        }
      } else { // claimant does not have a stamp
        response.redirect('/submit-claim/' + id)
      }
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      next()
    }
  })
})
