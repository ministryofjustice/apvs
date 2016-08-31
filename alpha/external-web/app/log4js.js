/**
 * This file defines a configures the log4js logging library.
 */
var log4js = require('log4js')

// TODO: Change the file path to a relative path.
log4js.configure('/usr/src/app/app/config/log4js-configuration.json')

module.exports = log4js
