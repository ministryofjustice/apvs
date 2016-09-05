// Include in the database.
var mongo = require('../app/database')

/**
 * Retrieve all claimants from the database.
 * @param callback A callback defining what to do after a successful and failed get.
 */
exports.getAll = function (callback) {
  mongo.db.collection('claimants').find().toArray(function (error, claimant) {
    if (!error) {
      callback(null, claimant)
    } else {
      callback(error, null)
    }
  })
}

/**
 * Retrieve a single claimant from the database by claimant ID.
 * @param id The id of the claimant to retrieve.
 * @param callback A callback defining what to do after a successful and failed get.
 */
exports.get = function (id, callback) {
  mongo.db.collection('claimants').findOne({ _id: exports.mongoId(id) }, function (error, claimant) {
    if (!error) {
      callback(null, claimant)
    } else {
      callback(error, null)
    }
  })
}

/**
 * Save a new claimant to the database.
 * @param claimant The claimant details to save.
 * @param callback A callback defining what to do after a successful and failed save.
 */
exports.save = function (claimant, callback) {
  mongo.db.collection('claimants').insertOne(claimant, function (error, savedClaimant) {
    if (!error) {
      callback(null, savedClaimant)
    } else {
      callback(error, null)
    }
  })
}

/**
 * Update an existing claimant.
 * @param id The id of the claimant to update.
 * @param claimant The claimant details to use for the update.
 * @param callback A callback defining what to do after a successful and failed update.
 */
exports.update = function (id, claimant, callback) {
  mongo.db.collection('claimants').updateOne({ _id: exports.mongoId(id) }, { $set: claimant }, function (error, updatedClaimant) {
    if (!error) {
      callback(null, updatedClaimant)
    } else {
      callback(error, null)
    }
  })
}

/**
 * Cleans the persistence store.
 * @param callback A callback defining what to do after a successful and failed update.
 */
exports.drop = function (callback) {
  mongo.db.dropCollection('claimants', function (error, updatedClaimant) {
    if (!error) {
      callback(null)
    } else {
      callback(error)
    }
  })
}

/**
 * Takes a string and wraps it as a Mongo ObjectID.
 * @param id The string to wrap as a Mongo ID.
 * @returns {ObjectID} A Mongo ObjectID suitable for making queries into a Mongo database.
 */
exports.mongoId = function (id) {
  return new mongo.client.ObjectID(id)
}
