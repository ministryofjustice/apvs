var express = require('express')
var router = express.Router()

module.exports = router

// Include custom route files.
require('./about-you');
require('./relationship');
require('./escorts');
require('./about-your-income');
require('./application-submitted');

/**
 * Render the landing page.
 */
router.get('/', function (request, response) {
  response.render('index')
})
