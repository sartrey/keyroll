'use strict'

module.exports = console

var chalk
try {
  chalk = require('chalk')
} catch (error) {}

const LOGO = 'keyroll'
const TYPE = {
  info: 'blue',
  warn: 'yellow',
  halt: 'red',
  done: 'green'
}
const TYPE_NAMES = Object.keys(TYPE)

function createLogger() {
  const logger = {}
  console.logger = logger
  Object.keys(TYPE).forEach(name => {
    logger[name] = chalk ?
      function () {
        var head = chalk[TYPE[name]](LOGO)
        var args = Array.prototype.slice.call(arguments, 0)
        console.log.apply(null, [head].concat(args))
      } :
      function () {
        var head = `[${LOGO}][${name}]`
        var args = Array.prototype.slice.call(arguments, 0)
        console.log.apply(null, [head].concat(args))
      }
  })
}

(function () {
  createLogger()
})()