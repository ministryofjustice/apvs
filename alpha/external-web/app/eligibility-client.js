// Include in the database.
var mongo = require('../app/database')

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
 * Update a field within an existing claimant.
 * @param id The id of the claimant to update.
 * @param fieldName The name of the field to update.
 * @param data The data to use for the update.
 * @param callback A callback defining what to do after a successful and failed update.
 */
exports.updateField = function (id, fieldName, data, callback) {
  var field = {}
  field[ fieldName ] = data
  mongo.db.collection('claimants').updateOne({ _id: exports.mongoId(id) }, { $set: field }, function (error, updatedClaimant) {
    if (!error) {
      callback(null, updatedClaimant)
    } else {
      callback(error, null)
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
