var CronJob = require('cron').CronJob
var process = require('./app/process-tasks')
var logger = require('./app/bunyan-logger')

logger.info('Launched Notify Worker process!')

var job = new CronJob({
  cronTime: '0 * * * * 0-6',
  onTick: function () {
    logger.info('Running notification task')
    process.run()
  },
  start: false
})

job.start()
