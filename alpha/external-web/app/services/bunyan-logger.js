var bunyan = require('bunyan')
var PrettyStream = require('bunyan-prettystream')
var bunyanLogstash = require('bunyan-logstash')

// Stream to handle pretty printing of Bunyan logs to stdout.
var prettyStream = new PrettyStream()
prettyStream.pipe(process.stdout)

var logstashStream = bunyanLogstash.createStream({
  host: '127.0.0.1',
  port: 5000
})

var logger = bunyan.createLogger({
  name: 'external',
  streams: [
    {
      level: 'DEBUG',
      stream: prettyStream
    },
    {
      type: 'raw',
      level: 'DEBUG',
      stream: logstashStream
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

module.exports = logger
