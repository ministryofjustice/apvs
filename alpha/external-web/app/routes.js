var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
    res.render('index')
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

// TODO: Split out the elements here such that only the route is defined in this file.

// Connect to a local Redis database.
var redis = require('redis');
var client = redis.createClient();

// TODO: Error checking. Is the database there.

client.on('connect', function () {
    console.log('Connected to database!');
});

// Route to save a claimant to the system.
router.post('/application_form', function (req, res) {
    console.log(req.body);
    // Render something.

    var firstName = req.body.first_name;
    var lastName = req.body.last_name;

    // Test save of a claimant.
    client.hmset('claimant', {
        'first_name': firstName,
        'last_name': lastName
    });


    res.render('add_user_success');

});


