const knex = require('./mysql-database')
const logger = require('../bunyan-logger')

exports.get = function (id, table) {
  return new Promise(function (resolve, reject) {

    knex(table).where({
      id: id,
    }).select('*')
      .then(function(result) {
      resolve(result)
    })
    .catch(function(error) {
      reject(error)
    })

  })
}

exports.save = function (record, table) {
  return new Promise(function (resolve, reject) {


    logger.info('In Save method.')

    knex(table).insert(record)
      .then(function () {
        resolve()
      })
      .catch(function (error) {
        reject(error)
      })

  })
}

exports.update = function (id, record, table) {
  return new Promise(function (resolve, reject) {




  })
}
