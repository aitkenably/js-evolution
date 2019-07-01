'use strict'

 const db = require('./database-faux')

// db.makeInitFail = true
// db.makeRunFail = true
// db.makeEachFail = true

 db.initialize(databaseReady)

 function databaseReady(err) {
  if (err) {
    console.log(err)
  } else {
    console.log('Initialized database')
    db.run("CREATE TABLE users id INT, name VARCHAR(255)", tableReady)
  }
 }

 function tableReady(err) {
  if (err) {
    console.log(err)
  }
  else {
   console.log('Created table users')
   console.log("Selecting users:")
   db.each("SELECT name FROM users", displayUsers)
  }
 }

 function displayUsers(err, row) {
  if (err) {
    console.log(err)
  } else {
    console.log(row)
  }
 }


