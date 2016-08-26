var express = require('express')
var router = express.Router()

module.exports = router

// Include custom route files.
require('./index')
require('./about-you')
require('./relationship')
require('./escorts')
require('./about-your-income')
require('./application-submitted')
