'use strict'

/*
* Demonstrates program flow with nested callback
* functions. (i.e. the pyramid of doom)
*/

const db = require('./database-faux')
const parseArgs = require('./args')

// Parse our -i, -c, -s options to force db errors
parseArgs(db)

db.initialize(function (err) {
  if (err) {
    console.error(err.message)
  } else {
    console.log('Initialized database')
    db.run('CREATE TABLE users id INT, name VARCHAR(255)', function (err) {
      if (err) {
        console.error(err.message)
      } else {
        console.log('Created table users')
        console.log('Listing users:')
        db.each('SELECT name FROM users', function (err, row) {
          if (err) {
            console.error(err.message)
          } else {
            console.log(row)
          }
        })
      }
    })
  }
})
