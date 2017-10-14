'use strict'

const keyroll = require('../')
const Record = keyroll.Record
const Volumn = keyroll.Volumn

module.exports = {
  getCurrentVolumn
}

function getCurrentVolumn() {
  return new Volumn()
}