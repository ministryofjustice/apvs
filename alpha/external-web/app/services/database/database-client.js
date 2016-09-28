const knex = require('./mysql-database')
const Promise = require('bluebird')
const logger = require('../bunyan-logger')

exports.get = function (id, table) {
  return new Promise(function (resolve, reject) {
    knex(table)
      .where({ id: id })
      .select('*')

      .then(function (record) {
        logger.debug('Retrieved record: %j', record)
        resolve(record)
      })

      .catch(function (error) {
        logger.error('Failed to retrieve record with id: %s', id, error)
        reject(error)
      })
  })
}

exports.save = function (record, table) {
  return new Promise(function (resolve, reject) {
    knex(table)
      .insert(record)
      .returning('id')

      .then(function (record) {
        logger.debug('Successfully saved record %j', record)
        resolve(record)
      })

      .catch(function (error) {
        logger.error('Failed to save record: %j', record, error)
        reject(error)
      })
  })
}

exports.update = function (id, record, table) {
  return new Promise(function (resolve, reject) {
    knex(table)
      .where({ 'id': id })
      .update(record)

      .then(function (updatedRows) {
        logger.debug('Successfully updated rows matched with id: %s. Number of rows updated: %s', id, updatedRows)
        resolve(updatedRows)
      })

      .catch(function (error) {
        logger.error('Failed to update rows matched by id: %s.', id, error)
        reject(error)
      })
  })
}
