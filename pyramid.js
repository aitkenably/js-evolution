'use strict'

/*
* Demonstrates program flow with nested callback
* functions. (i.e. the pyramid of doom)
*/

const db = require('./database-faux')
const parseArgs = require('./args')
const log = require('./log')

// Parse our -i, -c, -s options to force db errors
parseArgs(db)

db.initialize(function (err) {
  if (err) {
    log.error(err.message)
  } else {
    log.info('Initialized database')
    db.run('CREATE TABLE users id INT, name VARCHAR(255)', function (err) {
      if (err) {
        log.error(err.message)
      } else {
        log.info('Created table users')
        log.info('Selecting users')
        db.each('SELECT name FROM users', function (err, row) {
          if (err) {
            log.error(err.message)
          } else {
            console.log(row)
          }
        })
      }
    })
  }
})
