var mongo = require('./database')

exports.getAll = function (collectionName, callback) {
  mongo.db.collection(collectionName).find().toArray(function (error, data) {
    if (!error) {
      callback(null, data)
    } else {
      callback(error, null)
    }
  })
}

exports.get = function (id, collectionName, callback) {
  mongo.db.collection(collectionName).findOne({ _id: exports.mongoId(id) }, function (error, data) {
    if (!error) {
      callback(null, data)
    } else {
      callback(error, null)
    }
  })
}

exports.save = function (record, collectionName, callback) {
  mongo.db.collection(collectionName).insertOne(record, function (error, savedRecord) {
    if (!error) {
      callback(null, savedRecord)
    } else {
      callback(error, null)
    }
  })
}

exports.update = function (id, record, collectionName, callback) {
  mongo.db.collection(collectionName).updateOne({ _id: exports.mongoId(id) }, { $set: record }, function (error, updatedRecord) {
    if (!error) {
      callback(null, updatedRecord)
    } else {
      callback(error, null)
    }
  })
}

exports.drop = function (callback) {
  // Despite the name, this drops db contents only
  mongo.db.dropDatabase(function (error) {
    if (!error) {
      callback(null)
    } else {
      callback(error)
    }
  })
}

// Takes a string and wraps it as a Mongo ObjectID.
exports.mongoId = function (id) {
  return new mongo.client.ObjectID(id)
}
