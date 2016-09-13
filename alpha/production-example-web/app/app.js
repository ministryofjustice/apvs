var express = require('express')
var nunjucks = require('express-nunjucks')
var path = require('path')
var favicon = require('serve-favicon')
var bodyParser = require('body-parser')

var index = require('./routes/index')

var app = express()

var packageJson = require('../package.json')
var releaseVersion = packageJson.version
var serviceName = 'Assisted Prison Visit Service'
var cookieText = 'GOV.UK uses cookies to make the site simpler. <a href="#" title="Find out more about cookies">Find out more about cookies</a>'

app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))

nunjucks(app, {
  watch: true,
  noCache: true
})

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/public', express.static(path.join(__dirname, 'govuk_modules', 'govuk_template')))
app.use('/public', express.static(path.join(__dirname, 'govuk_modules', 'govuk_frontend_toolkit')))
app.use(favicon(path.join(__dirname, 'govuk_modules', 'govuk_template', 'images', 'favicon.ico')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// send assetPath to all views
app.use(function (req, res, next) {
  res.locals.asset_path = '/public/'
  next()
})

// Add variables that are available in all views
app.use(function (req, res, next) {
  res.locals.serviceName = serviceName
  res.locals.cookieText = cookieText
  res.locals.releaseVersion = 'v' + releaseVersion
  next()
})

app.use('/', index)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
