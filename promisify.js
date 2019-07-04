'use strict'

/*
* Demonstrates program flow with promise chaining
* by wrapping each of the database's callbacks
* in a promise using promisify.
*/

const { promisify } = require('util')
const parseArgs = require('./args')
const db = require('./database-faux')

// Parse our -i, -c, -s options to force db errors
parseArgs(db)

// We have to bind(db) to the return value of promisify
// to ensure 'this' is set correctly in our database API.
const initialize = promisify(db.initialize).bind(db)
const run = promisify(db.run).bind(db)

// The each callback is called multiple times by the
// database API (once for each row). Promises resolve
// only once, so our wrapping promise returns all the
// rows in an array.
//
// promisify doesn't provide this use-case, although
// there are other promise-wrapping libraries that
// do.
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
