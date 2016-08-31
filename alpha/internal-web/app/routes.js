var express = require('express')
var router = express.Router()

module.exports = router

// Include custom route files.
require('./routes/index')
require('./routes/claimants')
require('./routes/claimant-details')
require('./routes/api')
