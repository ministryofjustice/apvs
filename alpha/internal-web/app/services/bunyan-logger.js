var bunyan = require('bunyan')
var PrettyStream = require('bunyan-prettystream')
var bunyanLogstash = require('bunyan-logstash-tcp')

var logstashPath = process.env.LOGGING_PATH || 'logs/external-web.log'
var logstashHost = process.env.LOGSTASH_HOST
var logstashPort = process.env.LOGSTASH_PORT

// Stream to handle pretty printing of Bunyan logs to stdout.
var prettyStream = new PrettyStream()
prettyStream.pipe(process.stdout)

// Create a base logger for the application.
var logger = bunyan.createLogger({
  name: 'internal',
  streams: [],
  serializers: {
    'request': requestSerializer,
    'response': responseSerializer
  }
})

// Add console Stream.
logger.addStream({
  level: 'DEBUG',
  stream: prettyStream
})

// Add stream to push logs to Logstash for aggregation, reattempt connections indefinitely.
if (logstashHost && logstashPort) {
  var logstashStream = bunyanLogstash.createStream({
    host: logstashHost,
    port: logstashPort,
    max_connect_retries: 10,
    retry_interval: 1000 * 60
  }).on('error', console.log)

  logger.addStream({
    type: 'raw',
    level: 'DEBUG',
    stream: logstashStream
  })
}

// Add file stream.
logger.addStream({
  type: 'rotating-file',
  level: 'DEBUG',
  path: logstashPath,
  period: '1d',
  count: 7
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
