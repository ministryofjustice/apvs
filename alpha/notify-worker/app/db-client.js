var mongo = require('./database')

exports.getAll = function (callback) {
  mongo.db.collection('tasks').find({ name: 'application-notification' }).toArray(function (error, data) {
    if (!error) {
      callback(null, data)
    } else {
      callback(error, null)
    }
  })
}
