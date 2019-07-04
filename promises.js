'use strict'

/*
* Demonstrates program flow with promise chaining
* by wrapping each of the database's callbacks
* in a custom promise.
*/

const parseArgs = require('./args')
const db = require('./database-faux')

// Parse our -i, -c, -s options to force db errors
parseArgs(db)

function initialize () {
  return new Promise(function (resolve, reject) {
    db.initialize(function (err) {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

function run (sql) {
  return new Promise(function (resolve, reject) {
    db.run(sql, function (err) {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

// The each callback is called multiple times by the
// database API (once for each row). Promises resolve
// only once, so our wrapping promise returns all the
// rows in an array.
function each (sql, row) {
  return new Promise(function (resolve, reject) {
    const rows = []
    db.each(sql, function (err, row) {
      if (err) {
        reject(err)
      } else {
        rows.push(row)
      }
    })
    resolve(rows)
  })
}

initialize()
  .then(function () {
    console.log('Initialized database')
    return run('CREATE TABLE users id INT, name VARCHAR(255)')
  })
  .then(function () {
    console.log('Created table users')
    return each('SELECT name FROM users')
  })
  .then(function (rows) {
    console.log('Listing users:')
    rows.forEach(element => { console.log(element) })
  })
  .catch(function (err) {
    console.error(err.message)
  })
