var express = require('express')
var router = express.Router()

module.exports = router

// Include custom route files.
require('./routes/index')
require('./routes/about-you')
require('./routes/relationship')
require('./routes/escorts')
require('./routes/about-your-income')
require('./routes/application-submitted')
require('./routes/claim')
require('./routes/claim-details')
