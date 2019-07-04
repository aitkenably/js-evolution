'use strict'

/*
* Demonstrates program flow with using
* async / await.
*/

const { promisify } = require('util')

const db = require('./database-faux')
const parseArgs = require('./args')
const log = require('./log')

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

// 'await' can only be used in an 'async' function, meaning
// they can't appear at the top-level of our script, so
// we wrap those calls in an anonymous async immediately
// invoked function expression.
(async function () {
  try {
    await initialize()
    log.info('Initialized database')

    await run('CREATE TABLE users id INT, name VARCHAR(255)')
    log.info('Created table users')

    let rows = await each('SELECT name FROM users')
    log.info('Selecting users')
    rows.forEach(element => { console.log(element) })
  } catch (err) {
    log.error(err.message)
  }
})()
