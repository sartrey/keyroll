'use strict'

const uuidv4 = require('uuid/v4')

function getSimpleId() {
  return uuidv4().replace(/-/g, '')
}

class Record {
  constructor(record) {
    if (!record) record = {}
    this.uuid = record.uuid || getSimpleId()
    this.data = record.data || ''
    this.mime = record.mime || 'text/plain'
    this.tags = record.tags || []
  }

  setData(data, mime) {
    this.data = data
    this.mime = mime || 'text/plain'
    // todo - auto mime
  }
}

module.exports = Record
