var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  res.render('index')
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

// TODO: Split out the elements here such that only the route is defined in this file.

// Connect to a local Mongo DB
var MongoClient = require('mongodb').MongoClient
var db

MongoClient.connect('mongodb://localhost:27017/apvs', (err, database) => {
  if (!err) {
    db = database
    console.log('Connected to MongoDB')
  }
})

// Route to save a claimant to the system.
router.post('/application_form', function (req, res) {
  console.log(req.body)
  // Render something.

  // Test save of a claimant.
  db.collection('claimants').save(req.body, (err, result) => {
    if (!err) {
      res.render('add_user_success')
    }
  })
})

router.get('/list-users', function (req, res) {

  db.collection('claimants').find().toArray((err, results) => {
    console.log(results);
  });

  res.render('examples/template-data', { 'name': 'Foo' })
})
