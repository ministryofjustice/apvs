var express = require('express')
var router = express.Router()

var redis = require('redis')
var client = redis.createClient()

client.on('connect', function () {
  console.log('Connected to database!')
})

router.get('/', function (req, res) {
  client.hgetall('claimant', function (err, response) {
    if (err) {
      console.log('Error: ' + err)
    }
    console.log(response)
    res.render('index', { 'claimant': response })
  })
})

// Example routes - feel free to delete these

// Passing data into a page

router.get('/examples/template-data', function (req, res) {
  res.render('examples/template-data', {'name': 'Foo'})
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
