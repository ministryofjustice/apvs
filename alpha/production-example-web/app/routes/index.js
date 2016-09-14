var logger = require('../bunyan-logger')
var express = require('express')

module.exports = function (app) {
  var route = express.Router()

  app.use('/', route)

  route.get('/', function (req, res) {
    logger.info('index')
    res.render('index', { title: 'APVS index' })
  })
}
