'use strict'

const process = require('process')

module.exports = function parseArgs (db) {
  process.argv.forEach((val) => {
    if (val === '-i') {
      db.makeInitFail = true
    } else if (val === '-c') {
      db.makeCreateFail = true
    } else if (val === '-s') {
      db.makeSelectFail = true
    }
  })
}
