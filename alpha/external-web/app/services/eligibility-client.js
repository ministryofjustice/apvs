var mongo = require('./database')
var Promise = require('bluebird')

exports.get = function (id, collection) {
  return new Promise(function (resolve, reject) {
    mongo.db.collection(collection).findOne({ _id: exports.mongoId(id) })
      .then(function (record) {
        resolve(record)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

// savedRecord.ops[0] is retrieving the actual saved document from the mongo response.
exports.save = function (record, collection) {
  return new Promise(function (resolve, reject) {
    mongo.db.collection(collection).insertOne(record)
      .then(function (savedRecord) {
        resolve(savedRecord.ops[0])
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

exports.update = function (id, record, collection) {
  return new Promise(function (resolve, reject) {
    mongo.db.collection(collection).updateOne({ _id: exports.mongoId(id) }, { $set: record })
      .then(function (updatedRecord) {
        resolve(updatedRecord)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

// Takes a string and wraps it as a Mongo ObjectID.
exports.mongoId = function (id) {
  if (exports.isValidMongoId(id)) {
    return new mongo.client.ObjectID(id)
  }
  throw new Error({
    error: 'Invalid Mongo ID'
  })
}

exports.isValidMongoId = function (id) {
  return mongo.client.ObjectID.isValid(id)
}
