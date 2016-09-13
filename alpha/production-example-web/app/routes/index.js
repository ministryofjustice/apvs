var logger = require('../bunyan-logger')
var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  logger.info('index')
  res.render('index', { title: 'APVS index' })
})

module.exports = router
