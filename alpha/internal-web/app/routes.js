var express = require('express')
var router = express.Router()

// Connect to a local Mongo DB
var MongoClient = require('mongodb').MongoClient
var db

MongoClient.connect('mongodb://localhost:27017/apvs', function (err, database) {
  if (!err) {
    db = database
    console.log('Connected to MongoDB')
  }
})

// Get the list of claimants from the database.
router.get('/', function (req, res) {

  db.collection('claimants').find().toArray(function (err, results) {

    console.log(results)
    res.render('index', { 'claimants': JSON.stringify(results) })
  })

})

// Example routes - feel free to delete these

// Passing data into a page

router.get('/examples/template-data', function (req, res) {
  res.render('examples/template-data', { 'name': 'Foo' })
})

// Branching

router.get('/examples/over-18', function (req, res) {
  // get the answer from the query string (eg. ?over18=false)
  var over18 = req.query.over18

  if (over18 === 'false') {
    // redirect to the relevant page
    res.redirect('/examples/under-18')
  } else {
    // if over18 is any other value (or is missing) render the page requested
    res.render('examples/over-18')
  }
})

// add your routes here

module.exports = router
