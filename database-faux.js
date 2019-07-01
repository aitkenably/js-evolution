'use strict'

module.exports = {

  makeInitFail : false,
  makeCreateFail  : false,
  makeSelectFail : false,
   
  initialize: function(cb) {
    if (this.makeInitFail) {
      cb("Invalid database")
    } else {
      cb()
    }
  },

  run: function(sql, cb) {
    if (this.makeCreateFail) {
      cb("Invalid create table statement")
    } else {
      cb()
    }
  },

  each: function(sql, cb) {
    if (this.makeSelectFail) {
      cb("Invalid select statement", null)
    } else {
      ['user1', 'user2', 'user3'].forEach( (row) => cb(null, row))
    }
  }
}