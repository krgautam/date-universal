/* global define */
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    global.date = factory()
  }
})(this, function () {
  'use strict'

  var ESCAPE_CHAR = '\\'
  var millisecondsPerDay = 24 * 60 * 60 * 1000
  var localizationData = {
    en: {
      longDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      shortDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      longMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    de: {
      longDays: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
      shortDays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
      longMonths: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
      shortMonths: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
    }
  }
  var utc = 'UTC'
  var iso8601NumericDay = ['7', '1', '2', '3', '4', '5', '6']
  var numberSuffix = (function (sufs) {
    return function (date) {
      return (sufs[date.getDate() % 10] || 'th')
    }
  }(['th', 'st', 'nd', 'rd']))

  var tokens = {
    d: function (date, locale) {
      return String(100 + date.getDate()).slice(1)
    },
    j: function (date, locale) {
      return String(date.getDate())
    },
    D: function (date, locale) {
      if(date.getDay()>0)
      return localizationData[locale]['shortDays'][date.getDay() - 1]
      else 
      return localizationData[locale]['shortDays'][6]
    },
    l: function (date, locale) {
      if(date.getDay()>0)  
      return localizationData[locale]['longDays'][date.getDay() - 1]
      else 
      return localizationData[locale]['longDays'][6]    
    },
    N: function (date, locale) {
      return iso8601NumericDay[date.getDay()]
    },
    S: numberSuffix, // locale-dependent!
    w: function (date, locale) {
      return String(date.getDay())
    },
    z: function (date, locale) {
      var start = (new Date(date.getFullYear(), 0, 1)).getTime()
      return String(Math.floor((date.getTime() - start) / millisecondsPerDay))
    },
    F: function (date, locale) {
      return localizationData[locale]['longMonths'][date.getMonth()]
    },
    m: function (date, locale) {
      return String(date.getMonth() + 101).slice(1)
    },
    M: function (date, locale) {
      return localizationData[locale]['shortMonths'][date.getMonth()]
    },
    n: function (date, locale) {
      return String(date.getMonth() + 1)
    },
    L: function (date, locale) {
      var year = date.getFullYear()
      if (((year % 4) === 0 && (year % 100) !== 0) || (year % 400) === 0) {
        return '1'
      }
      return '0'
    },
    t: function (date, locale) {
      if (date.getMonth() === 1) {
        return this.L(date) === '1' ? '29' : '28'
      }
      if ([0, 2, 4, 6, 7, 9, 11].indexOf(date.getMonth()) !== -1) {
        return '31'
      }
      return '30'
    },
    Y: function (date, locale) {
      return String(date.getFullYear())
    },
    y: function (date, locale) {
      return String(date.getFullYear()).substr(2, 2)
            // Using the exact positions will give a little performance boost for
            // the next few thousand years, at the cost of a little maintainance
            // effort in the far future. (Writing this @ 2017-02-24)
    },
    a: function (date, locale) {
      return date.getHours() < 12 ? 'am' : 'pm'
    },
    A: function (date, locale) {
      return this.a(date).toUpperCase()
    },
    g: function (date, locale) {
      return String(date.getHours() % 12 || 12)
    },
    G: function (date, locale) {
      return String(date.getHours())
    },
    h: function (date, locale) {
      var h = this.g(date)
      return (h.length === 2 ? h : '0' + h)
    },
    H: function (date, locale) {
      return String(100 + date.getHours()).slice(1)
    },
    i: function (date, locale) {
      return String(100 + date.getMinutes()).slice(1)
    },
    s: function (date, locale) {
      return String(100 + date.getSeconds()).slice(1)
    },
    u: function (date, locale) {
      return String(1000 + date.getMilliseconds()).slice(1)
    },
    U: function (date, locale) {
      return String(Math.floor(date.getTime() / 1000))
    },
    P: function (date, locale) {
      var offsetMinutes = date.getTimezoneOffset()
      var sign = offsetMinutes < 0 ? '-' : '+'
      offsetMinutes = Math.abs(offsetMinutes)
      var hours = Math.floor(offsetMinutes / 60)
      var minutes = offsetMinutes % 60
      return sign + String(100 + hours).slice(1) + ':' +
                    String(100 + minutes).slice(1)
    },
    O: function (date, locale) {
      var offsetMinutes = date.getTimezoneOffset()
      var sign = offsetMinutes < 0 ? '-' : '+'
      offsetMinutes = Math.abs(offsetMinutes)
      var hours = Math.floor(offsetMinutes / 60)
      var minutes = offsetMinutes % 60
      return sign + String(10000 + (100 * hours) + minutes).slice(1)
    },
    c: function (_date, locale) {
      return date('Y-m-dTH:i:sP', _date, locale)
    },
    r: function (_date, locale) {
      return date('D, d M Y H:i:s O', _date, locale)
    }
  }

  function date (format, time, locale = 'en') {
    var specimen, idx, char, replacement, head, tail
    process.env.TZ = utc
    if (!time) {
      time = new Date()
    } else if ((time.toString().trim().indexOf('+') === 0) || (time.toString().trim().indexOf('-') === 0)) {
      var timestr = time.split(' ')
      time = new Date()
      if (timestr[1].toLowerCase() === 'day' || timestr[1].toLowerCase() === 'days') {
        if (timestr[0].charAt(0) === '+') {
          time.setDate(time.getDate() + parseInt(timestr[0].charAt(1)))
        } else if (timestr[0].charAt(0) === '-') {
          time.setDate(time.getDate() - parseInt(timestr[0].charAt(1)))
        }
      } else if (timestr[1].toLowerCase() === 'month' || timestr[1].toLowerCase() === 'months') {
        if (timestr[0].charAt(0) === '+') {
          time.setMonth(time.getMonth() + parseInt(timestr[0].charAt(1)))
        } else if (timestr[0].charAt(0) === '-') {
          time.setMonth(time.getMonth() - parseInt(timestr[0].charAt(1)))
        }
      } else if (timestr[1].toLowerCase() === 'year' || timestr[1].toLowerCase() === 'year') {
        if (timestr[0].charAt(0) === '+') {
          time.setYear(time.getYear() + parseInt(timestr[0].charAt(1)))
        } else if (timestr[0].charAt(0) === '-') {
          time.setYear(time.getYear() - parseInt(timestr[0].charAt(1)))
        }
      } else if (timestr[1].toLowerCase() === 'hour' || timestr[1].toLowerCase() === 'hours') {
        if (timestr[0].charAt(0) === '+') {
          time.setHours(time.getHours() + parseInt(timestr[0].charAt(1)))
        } else if (timestr[0].charAt(0) === '-') {
          time.setHours(time.getHours() - parseInt(timestr[0].charAt(1)))
        }
      } else if (timestr[1].toLowerCase() === 'minutes' || timestr[1].toLowerCase() === 'minute' || timestr[1].toLowerCase() === 'min') {
        if (timestr[0].charAt(0) === '+') {
          time.setMinutes(time.getMinutes() + parseInt(timestr[0].charAt(1)))
        } else if (timestr[0].charAt(0) === '-') {
          time.setMinutes(time.getMinutes() - parseInt(timestr[0].charAt(1)))
        }
      } else if (timestr[1].toLowerCase() === 'seconds' || timestr[1].toLowerCase() === 'second' || timestr[1].toLowerCase() === 'sec') {
        if (timestr[0].charAt(0) === '+') {
          time.setSeconds(time.getSeconds() + parseInt(timestr[0].charAt(1)))
        } else if (timestr[0].charAt(0) === '-') {
          time.setSeconds(time.getSeconds() - parseInt(timestr[0].charAt(1)))
        }
      }
    } else {
      time = new Date(time)
    }
    specimen = format.split('')
    for (idx = 0; idx < specimen.length; idx++) {
      if (idx > 0 && specimen[Math.max(0, idx - 1)] === ESCAPE_CHAR) {
        head = specimen.slice(0, idx - 1)
        tail = specimen.slice(idx)
        specimen = head.concat(tail)
        idx -= 1
        continue
      }
      char = specimen[idx]
      if (!tokens[char]) {
        continue
      }
      replacement = tokens[char](time, locale).split('')
      head = specimen.slice(0, idx)
      tail = specimen.slice(idx + 1)
      specimen = head.concat(replacement, tail)
      idx += (replacement.length - 1)
    }
    return specimen.join('')
  }
  function UTC (tz) {
    utc = tz
  }
  return {date: date, localizationData: localizationData, UTC: UTC}
})
