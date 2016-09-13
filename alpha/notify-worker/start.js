var CronJob = require('cron').CronJob
var client = require('./app/db-client')
var logger = require('./app/bunyan-logger')
var _ = require('lodash')

logger.info('Launched Notify Worker process!')

var job = new CronJob({
  cronTime: '* * * * * *', // every minute
  onTick: runWorker,
  start: false
})

function runWorker () {
  var results = client.getAll()

  _(results).forEach(function (value) {
    logger.info(value.name + ': ' + value.status)
  })
}

job.start()