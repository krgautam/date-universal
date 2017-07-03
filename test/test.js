/* global describe, it, beforeEach */
'use strict'

var dateUniversal = require('../')
var assert = require('assert')
describe('dateUniversal', function () {
  var date
  beforeEach(function () {
    date = new Date(2005, 6, 14, 22, 30, 41)
  })
  it('should correctly dateUniversal.date  dates', () => {
    assert.equal(dateUniversal.date('F j, Y, g:i a', date), 'July 14, 2005, 10:30 pm')
    assert.equal(dateUniversal.date('m.d.y', date), '07.14.05')
    assert.equal(dateUniversal.date('j, n, Y', date), '14, 7, 2005')
    assert.equal(dateUniversal.date('Ymd', date), '20050714')
    assert.equal(dateUniversal.date('h-i-s, j-m-y, it is w Day', date), '10-30-41, 14-07-05, 3031 3041 4 Thupm05')
    assert.equal(dateUniversal.date('D M j G:i:s Y', date), 'Thu Jul 14 22:30:41 2005')
    assert.equal(dateUniversal.date('H:i:s', date), '22:30:41')
  })

  it('should correctly dateUniversal.date dates', () => {
    assert.equal(dateUniversal.date('F j, Y, g:i a', date), 'July 14, 2005, 10:30 pm')
    assert.equal(dateUniversal.date('m.d.y', date), '07.14.05')
    assert.equal(dateUniversal.date('j, n, Y', date), '14, 7, 2005')
    assert.equal(dateUniversal.date('Ymd', date), '20050714')
    assert.equal(dateUniversal.date('h-i-s, j-m-y, it is w Day', date), '10-30-41, 14-07-05, 3031 3041 4 Thupm05')
    assert.equal(dateUniversal.date('D M j G:i:s Y', date), 'Thu Jul 14 22:30:41 2005')
    assert.equal(dateUniversal.date('H:i:s', date), '22:30:41')
  })
})
