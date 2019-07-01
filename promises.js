'use strict'

 const db = require('./database-faux')
 
function initialize() {
  return new Promise(function(resolve, reject) {
    db.initialize(function(err) {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}


function run(sql) {
  return new Promise(function(resolve, reject) {
    db.run(sql, function(err) {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

function each(sql, row) {
  return new Promise(function(resolve, reject) {
    const rows = []
    db.each(sql, function(err, row) {
      if (err) {
        reject(err)
      } else {
        rows.push(row)
      }
    })
    resolve(rows)
  })
}

// db.makeInitFail = true
// db.makeRunFail = true
// db.makeEachFail = true

initialize()
  .then(function() {
    console.log('Initialized database')
    return run("CREATE TABLE users id INT, name VARCHAR(255)")
  })
  .then(function() {
    console.log('Created table users')
    return each("SELECT name FROM users")
  })
  .then(function (rows) {
    console.log("Listing users")
    rows.forEach(element => { console.log(element) })
  })
.catch(function (err) {
  console.log('ERROR: ' + err)
})
