var express = require('express')
var router = express.Router()
var mongo = require('./database');

module.exports = router

/**
 * Render the landing page with the claimants currently stored in the database.
 */
router.get('/', function (request, response) {
  response.render('index')
})

/**
 * Retrieve all claimants in the system.
 */
router.get('/claimants', function (request, response) {
  mongo.db.collection('claimants').find().toArray(function (error, results) {
    if (!error) {
      console.log('Returning all claimants:')
      console.log(results)

      // Append 'data' to the JSON object. Required by the DataTable library.
      var claimants = { data: results }
      response.json(claimants)
    }
  })
})

/**
 * Retrieve a single claimant by their claimant ID.
 */
router.get('/claimant/:claimant_id', function (request, response) {
  var id = new mongo.client.ObjectID(request.params.claimant_id);
  console.log('Retrieving claimant with ID: ' + id);

  mongo.db.collection('claimants').find({ _id: id }).toArray(function (error, results) {
    if (!error) {
      console.log('Returning claimant:')
      console.log(results)
      response.json(results)
    }
  })
})