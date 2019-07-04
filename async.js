'use strict'

const { promisify } = require('util')
const parseArgs = require('./args')
const db = require('./database-faux')

parseArgs(db)

const initialize = promisify(db.initialize).bind(db)
const run = promisify(db.run).bind(db)

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

(async function () {
  try {
    await initialize()
    console.log('Initialized database')

    await run('CREATE TABLE users id INT, name VARCHAR(255)')
    console.log('Created table users')

    let rows = await each('SELECT name FROM users')
    console.log('Listing users:')
    rows.forEach(element => { console.log(element) })
  } catch (err) {
    console.error(err.message)
  }
})()
