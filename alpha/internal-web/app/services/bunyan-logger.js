var bunyan = require('bunyan')
var PrettyStream = require('bunyan-prettystream')

// Stream to handle pretty printing of Bunyan logs to stdout.
var prettyStream = new PrettyStream()
prettyStream.pipe(process.stdout)

exports.logger = bunyan.createLogger({
  name: 'internal',
  streams: [
    {
      level: 'DEBUG',
      stream: prettyStream
    },
    {
      level: 'DEBUG',
      path: '/usr/src/app/logs/external-web.log'
    }
  ],
  serializers: {
    'request': requestSerializer,
    'response': responseSerializer
  }
})

function requestSerializer (request) {
  return {
    url: request.url,
    method: request.method,
    params: request.params
  }
}

function responseSerializer (response) {
  return {
    statusCode: response.statusCode
  }
}