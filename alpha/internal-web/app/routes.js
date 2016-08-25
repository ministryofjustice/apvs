var express = require('express')
var router = express.Router()

module.exports = router

// TODO: Extract the database connection into another file.

// Connect to a local Mongo DB
var MongoClient = require('mongodb').MongoClient
var db

MongoClient.connect('mongodb://localhost:27017/apvs', function (err, database) {
  if (!err) {
    db = database
    console.log('Connected to MongoDB')
  }
})

// Render the landing page with the claimants currently stored in the database.
router.get('/', function (req, res) {
  res.render('index')
})

// Return json object containing array of claimants
router.get('/claimants', function (req, res) {
  db.collection('claimants').find().toArray(function (err, results) {
    if (!err) {
      console.log(results)
      // 'data' property needed for DataTable used to display claimants
      var response = { data: results }
      res.json(response)
    }
  })
})
