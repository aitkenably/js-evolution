'use strict'

const process = require('process')
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
