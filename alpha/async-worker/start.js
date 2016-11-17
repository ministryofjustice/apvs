var CronJob = require('cron').CronJob
var process = require('./app/process-tasks')
var logger = require('./app/bunyan-logger')

logger.info('Launched Async Worker process!')

var job = new CronJob({
  cronTime: '0 * * * * 0-6',
  onTick: function () {
    logger.info('Running notification tasks')
    process.runNotificationTasks()

    logger.info('Running doc gen tasks')
    process.runDocGenerationTasks()
  },
  start: false
})

job.start()
