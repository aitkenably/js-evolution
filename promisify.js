'use strict'

const process = require('process')
const { promisify } = require('util')
const db = require('./database-faux')

process.argv.forEach((val) => {
  if (val === '-i') {
    db.makeInitFail = true
  } else if (val === '-c') {
    db.makeCreateFail = true
  } else if (val === '-s') {
    db.makeSelectFail = true
  }
})

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
