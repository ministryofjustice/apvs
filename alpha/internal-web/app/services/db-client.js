var mongo = require('./database')
var Promise = require('bluebird')

exports.getAll = function (collection) {
  return new Promise(function (resolve, reject) {
    mongo.db.collection(collection).find().toArray()
      .then(function (data) {
        resolve(data)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

exports.get = function (id, collection) {
  return new Promise(function (resolve, reject) {
    mongo.db.collection(collection).findOne({ _id: exports.mongoId(id) })
      .then(function (claimant) {
        resolve(claimant)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

exports.save = function (claimant, collection) {
  return new Promise(function (resolve, reject) {
    mongo.db.collection(collection).insertOne(claimant)
      .then(function (savedClaimant) {
        resolve(savedClaimant.ops[0])
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

exports.update = function (id, claimant, collection) {
  return new Promise(function (resolve, reject) {
    mongo.db.collection(collection).updateOne({ _id: exports.mongoId(id) }, { $set: claimant })
      .then(function (updatedClaimant) {
        resolve(updatedClaimant)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

// Despite the name, this drops db contents only
exports.drop = function () {
  return new Promise(function (resolve, reject) {
    mongo.db.dropDatabase()
      .then(function () {
        resolve()
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

exports.dropCollection = function (collection) {
  return new Promise(function (resolve, reject) {
    mongo.db.dropCollection(collection)
      .then(function () {
        resolve()
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
