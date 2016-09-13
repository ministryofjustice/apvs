var router = require('../routes')
var client = require('../services/eligibility-client')
var logger = require('../services/bunyan-logger')

// Require file upload library.
var multer = require('multer')
var upload = multer({ dest: 'visit-stamp-uploads/' })

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
      var stampReceived = request['body']['visit-stamp-received']
      var visitStampDetails = {}
      visitStampDetails['visit-stamp-received'] = stampReceived

      if (stampReceived === 'Yes') {
        // only require a file upload if claimant has received a stamp
        if (!request.file) {
          response.status(500).render('error', { error: 'Failed to update claimant with id: ' + id + '. No file was uploaded.' })
          next()
        } else {
          visitStampDetails['visit-stamp-file'] = {
            visitStampId: request.file.filename,
            originalFilename: request.file.originalname,
            path: request.file.path
          }
          client.update(id, visitStampDetails, function (error, claimant) {
            if (!error) {
              logger.info('Successfully updated claimant with id: %s', id)
              response.redirect('/submit-claim/' + id)
              next()
            } else {
              response.status(500).render('error', { message: error.message, error: error })
              next()
            }
          })
        }
      } else { // stampReceived !== Yes
        client.update(id, visitStampDetails, function (error, claimant) {
          if (!error) {
            logger.info('Successfully updated claimant with id: %s', id)
            response.redirect('/submit-claim/' + id)
            next()
          } else {
            response.status(500).render('error', { message: error.message, error: error })
            next()
          }
        })
      }
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      next()
    }
  })
})
