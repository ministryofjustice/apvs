var mongo = require('./database')
var Promise = require('bluebird')

exports.get = function (id) {
  return new Promise(function (resolve, reject) {
    mongo.db.collection('claimants').findOne({ _id: exports.mongoId(id) }, function (error, claimant) {
      if (!error) {
        resolve(claimant)
      } else {
        reject(error)
      }
    })
  })
}

exports.save = function (claimant) {
  return new Promise(function (resolve, reject) {
    mongo.db.collection('claimants').insertOne(claimant, function (error, savedClaimant) {
      if (!error) {
        resolve(savedClaimant.ops[0])
      } else {
        reject(error)
      }
    })
  })
}

exports.update = function (id, claimant) {
  return new Promise(function (resolve, reject) {
    mongo.db.collection('claimants').updateOne({ _id: exports.mongoId(id) }, { $set: claimant }, function (error, updatedClaimant) {
      if (!error) {
        resolve(updatedClaimant)
      } else {
        reject(error)
      }
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
