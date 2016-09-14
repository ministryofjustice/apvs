var mongo = require('./database')
var logger = require('./bunyan-logger')
var Promise = require('bluebird')

const collectionName = 'tasks'
const taskName = 'application-notification'
const pendingStatus = 'PENDING'
const completedStatus = 'COMPLETED'

exports.getPendingNotifications = function () {
  return new Promise(function (resolve, reject) {
    mongo.db.collection(collectionName).find({
      name: taskName,
      status: pendingStatus
    }).toArray()
      .then(function (records) {
        resolve(records)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

exports.setTaskComplete = function (id) {
  return new Promise(function (resolve, reject) {
    var record = { status: completedStatus }
    mongo.db.collection(collectionName).updateOne({ _id: id }, { $set: record })
      .then(function (updatedRecord) {
        logger.info('Notification task status updated to: ' + completedStatus)
        resolve(updatedRecord)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}
