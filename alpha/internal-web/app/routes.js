var express = require('express')
var router = express.Router()

module.exports = router

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

// Render the landing page with the claimants currently stored in the database.
router.get('/', function (req, res) {
  db.collection('claimants').find().toArray(function (err, results) {
    if (!err) {
      console.log(results)
      res.render('index', { 'claimants': JSON.stringify(results) })
    }
  })
})
