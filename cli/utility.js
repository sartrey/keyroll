'use strict'

const os = require('os')
const path = require('path')
const { Record, Volumn } = require('../')

module.exports = {
  parseParams,
  splitTagText,
  getCurrentVolumn
}

function parseParams(argv) {
  const regexp = /^(\-\-)?([a-z0-9]+)\=?(\S+)?$/
  const argkey = {
    'use': ['root'],
    'get': ['uuid', 'tags'],
    'set': ['uuid', 'data', 'file', 'tags'],
    'tag': ['uuid', 'tags']
  }
  var o = { action: null, search: {}, enable: {} }
  if (!argkey[argv[2]]) return o
  o.action = argv[2]
  var kwords = argkey[o.action]
  for (var i = 3; i < argv.length; i ++) {
    // match = [all, --, key, value]
    let match = argv[i].match(regexp)
    if (!match || !match[2]) continue
    if (match[1] === '--') {
      o.enable[match[2]] = true
    } else if (kwords.indexOf(match[2]) >= 0) {
      o.search[match[2]] = match[3]
    } else {
      o.search['argv' + (i - 3)] = argv[i]
    }
  }
  return o
}

function splitTagText(text) {
  return text.split(/,|;|\s/).filter(Boolean)
}

async function getCurrentVolumn() {
  var homedir = path.join(os.homedir(), '.keyroll')
  var volumn = new Volumn()
  try {
    await volumn.reload(path.join(homedir, 'default'))
  } catch (error) {
    await volumn.commit()
  }
  return volumn
}