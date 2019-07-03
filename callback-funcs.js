'use strict'

const parseArgs = require('./args')
const db = require('./database-faux')

parseArgs(db)

function handleInit (err) {
  if (err) {
    console.error(err.message)
  } else {
    console.log('Initialized database')
    db.run('CREATE TABLE users id INT, name VARCHAR(255)', handleCreate)
  }
}

function handleCreate (err) {
  if (err) {
    console.error(err.message)
  } else {
    console.log('Created table users')
    console.log('Listing users:')
    db.each('SELECT name FROM users', handleSelect)
  }
}

function handleSelect (err, row) {
  if (err) {
    console.error(err.message)
  } else {
    console.log(row)
  }
}

db.initialize(handleInit)
