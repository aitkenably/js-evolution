'use strict'

module.exports = {

  makeInitFail : false,
  makeRunFail  : false,
  makeEachFail : false,
  
  initialize: function(cb) {
    if (this.makeInitFail) {
      cb("Invalid database")
    } else {
      cb()
    }
  },

  run: function(sql, cb) {
    if (this.makeRunFail) {
      cb("Invalid create table statement")
    } else {
      cb()
    }
  },

  each: function(sql, cb) {
    if (this.makeEachFail) {
      cb("Invalid select statement", null)
    } else {
      ['user1', 'user2', 'user3'].forEach( (row) => cb(null, row))
    }
  }
}