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

var MONGO_URL = 'mongodb://mongo:27017/apvs'
// 'mongodb://localhost:27017/apvs'

MongoClient.connect(MONGO_URL, function (err, database) {
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
    if (!err) {
      console.log('Database contents:')
      console.log(results)
    }
  })
})
