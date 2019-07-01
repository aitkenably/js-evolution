'use strict'

 const db = require('./database-faux')

// db.makeInitFail = true
// db.makeRunFail = true
// db.makeEachFail = true

 db.initialize(function(err) {
   if (err) {
     console.log(err)
   } else {
     console.log('Initialized database')
     db.run("CREATE TABLE users id INT, name VARCHAR(255)", function(err) {
       if (err) {
         console.log(err)
       }
       else {
        console.log('Created table users')
        console.log("Selecting users:")
        db.each("SELECT name FROM users", function(err, row) {
          if (err) {
            console.log(err)
          } else {
            console.log(row)
          }
        })
       }
     })
   }
 })