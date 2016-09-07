var bunyan = require('bunyan')
exports.logger = bunyan.createLogger({
  name: 'internal',
  streams: [
    {
      level: 'INFO',
      stream: process.stdout
    },
    {
      level: 'INFO',
      path: '/usr/src/app/logs/external-web.log'
    }
  ],
  serializers: {
    'request': requestSerializer
  }
})

function requestSerializer (request) {
  return {
    url: request.url,
    method: request.method,
    params: request.params
  }
}
