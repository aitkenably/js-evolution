'use strict'

const db = require('./database-faux')
const parseArgs = require('./args')

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
