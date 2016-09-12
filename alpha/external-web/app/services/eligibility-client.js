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

exports.save = function (claimant, callback) {
  mongo.db.collection('claimants').insertOne(claimant, function (error, savedClaimant) {
    if (!error) {
      callback(null, savedClaimant.ops[0])
    } else {
      callback(error, null)
    }
  })
}

exports.update = function (id, claimant, callback) {
  mongo.db.collection('claimants').updateOne({ _id: exports.mongoId(id) }, { $set: claimant }, function (error, updatedClaimant) {
    if (!error) {
      callback(null, updatedClaimant)
    } else {
      callback(error, null)
    }
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
