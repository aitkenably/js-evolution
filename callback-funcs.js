'use strict'

/*
* Demonstrates program flow with explicitly named
* callback functions.
*/

const db = require('./database-faux')
const parseArgs = require('./args')
const log = require('./log')

// Parse our -i, -c, -s options to force db errors
parseArgs(db)

function handleInit (err) {
  if (err) {
    log.error(err.message)
  } else {
    log.info('Initialized database')
    db.run('CREATE TABLE users id INT, name VARCHAR(255)', handleCreate)
  }
}

function handleCreate (err) {
  if (err) {
    log.error(err.message)
  } else {
    log.info('Created table users')
    log.info('Selecting users')
    db.each('SELECT name FROM users', handleSelect)
  }
}

function handleSelect (err, row) {
  if (err) {
    log.error(err.message)
  } else {
    console.log(row)
  }
}

db.initialize(handleInit)
