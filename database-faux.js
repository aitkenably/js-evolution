'use strict'

module.exports = {

  makeInitFail: false,
  makeCreateFail: false,
  makeSelectFail: false,

  initialize: function (callback) {
    if (this.makeInitFail) {
      callback(new Error('Invalid database'))
    } else {
      callback(null)
    }
  },

  run: function (sql, callback) {
    if (this.makeCreateFail) {
      callback(new Error('Invalid create table statement'))
    } else {
      callback(null)
    }
  },

  each: function (sql, callback) {
    if (this.makeSelectFail) {
      callback(new Error('Invalid select statement'), null)
    } else {
      ['user1', 'user2', 'user3'].forEach((row) => callback(null, row))
    }
  }
}
