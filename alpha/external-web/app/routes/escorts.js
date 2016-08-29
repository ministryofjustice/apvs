/**
 * This file defines all routes for the escorts page.
 */
var router = require('../routes')

// TODO: Should be included in a controller file rather than by each routes file.
var mongo = require('../database')

/**
 * Renders the escorts page with the details of the claimant with the given claimant id.
 *
 * Example call: http://localhost:3000/escorts/57c3f1139e03be003bfac1aa
 */
router.get('/escorts/:claimant_id', function (request, response) {
  var id = new mongo.client.ObjectID(request.params.claimant_id)
  console.log('GET /escorts/' + id + ' called.')

  mongo.db.collection('claimants').findOne({ _id: id }, function (error, claimant) {
    if (!error) {
      response.render('escorts', { 'claimant': claimant })
    }
  })
})

/**
 * Save the contents of the relationship form to the document for the claimant with the given id.
 *
 * Example call: http://localhost:3000/escorts/57c3f1139e03be003bfac1aa
 */
router.post('/escorts/:claimant_id', function (request, response) {
  var id = new mongo.client.ObjectID(request.params.claimant_id)
  console.log('POST /escorts/' + id + ' called.')

  // Update the claimants details.
  mongo.db.collection('claimants').updateOne({ _id: id }, { $set: request.body }, function (error, result) {
    console.log(result)
    if (!error) {
      response.redirect('/about-your-income/' + id)
    }
  })
})
