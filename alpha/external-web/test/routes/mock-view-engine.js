var path = require('path')

var viewEngine = function (app, viewsPath) {
  app.engine('html', function (filePath, options, callback) {
    var rendered = `${filePath}: ${options}`
    return callback(null, rendered)
  })
  app.set('view engine', 'html')
  app.set('views', [ path.join(__dirname, viewsPath), path.join(__dirname, '../../lib/') ])
}

exports.default = viewEngine
module.exports = exports['default']
