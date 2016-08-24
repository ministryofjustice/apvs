var express = require('express')
var router = express.Router()

module.exports = router

// Render the landing page.
router.get('/', function (req, res) {
  res.render('index')
})

// TODO: Split out the elements here such that only the route is defined in this file.
// TODO: Extract the database connection into another file.

// Connect to a local Mongo DB
var MongoClient = require('mongodb').MongoClient
var db

MongoClient.connect('mongodb://localhost:27017/apvs', function(err, database) {
  if (!err) {
    db = database
    console.log('Connected to MongoDB')
  }
})

// Route to save a claimant to the system.
router.post('/application_form', function (req, res) {

  // Test save of a claimant.
  db.collection('claimants').save(req.body, function (err, result) {
    if (!err) {
      res.render('add_user_success')
    }
  })

  // Print out the current stored claimants of the database.
  db.collection('claimants').find().toArray(function (err, results) {
    console.log('Database contents:');
    console.log(results);
  });

})