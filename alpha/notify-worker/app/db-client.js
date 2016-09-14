var mongo = require('./database')
var Promise = require('bluebird')

const collectionName = 'tasks'
const taskName = 'application-notification'
const pendingStatus = 'PENDING'

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
