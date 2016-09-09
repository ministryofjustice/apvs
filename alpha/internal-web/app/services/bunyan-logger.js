var bunyan = require('bunyan')
var PrettyStream = require('bunyan-prettystream')
var bunyanLogstash = require('bunyan-logstash-tcp')

// Stream to handle pretty printing of Bunyan logs to stdout.
var prettyStream = new PrettyStream()
prettyStream.pipe(process.stdout)

// Stream to push logs to Logstash for aggregation, reattempt connections indefinitely.
var logstashStream = bunyanLogstash.createStream({
  host: 'elk',
  port: 9998,
  max_connect_retries: 10,
  retry_interval: 1000 * 60
}).on('error', console.log)

var logger = bunyan.createLogger({
  name: 'internal',
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
      type: 'rotating-file',
      level: 'DEBUG',
      path: '/usr/src/app/logs/internal-web.log',
      period: '1d',
      count: 7
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
