var mongo = require('./database')

exports.getAll = function (callback) {
  mongo.db.collection('claimants').find().toArray(function (error, claimant) {
    if (!error) {
      callback(null, claimant)
    } else {
      callback(error, null)
    }
  })
}

exports.get = function (id, callback) {
  mongo.db.collection('claimants').findOne({ _id: exports.mongoId(id) }, function (error, claimant) {
    if (!error) {
      callback(null, claimant)
    } else {
      callback(error, null)
    }
  })
}

exports.save = function (claimant, callback) {
  mongo.db.collection('claimants').insertOne(claimant, function (error, savedClaimant) {
    if (!error) {
      callback(null, savedClaimant)
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

exports.drop = function (callback) {
  mongo.db.dropCollection('claimants', function (error, updatedClaimant) {
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
