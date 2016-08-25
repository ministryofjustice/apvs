var express = require('express')
var router = express.Router()

module.exports = router

// TODO: Extract the database connection into another file.

// Connect to a local Mongo DB
var MONGO = require('mongodb')
var MONGO_CLIENT = MONGO.MongoClient
var db

MONGO_CLIENT.connect('mongodb://localhost:27017/apvs', function (error, database) {
  if (!error) {
    db = database
    console.log('Connected to MongoDB')
  }
})

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
  db.collection('claimants').find().toArray(function (error, results) {
    if (!error) {
      console.log('Returning all claimants:')
      console.log(results)

      // Append the 'data' property required by the DataTable library.
      var claimants = { data: results }
      response.json(claimants)
    }
  })
})

/**
 * Retrieve a single claimant by their claimant ID.
 */
router.get('/claimant/:claimant_id', function (request, response) {
  var id = new MONGO.ObjectID(request.params.claimant_id);
  console.log('Retrieving claimant with ID: ' + id);

  db.collection('claimants').find({ _id: id }).toArray(function (error, results) {
    if (!error) {
      console.log('Returning claimant:')
      console.log(results)
      response.json(results)
    }
  })
})