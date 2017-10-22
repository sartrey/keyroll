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

  getData() {
    return this.data
  }

  setData(data, mime) {
    this.data = data
    this.mime = mime || 'text/plain'
    // todo - auto mime
  }

  hasTags(tags) {
    return tags.some(tag => this.tags.includes(tag))
  }

  addTags(tags) {
    tags.forEach(tag => {
      if (!this.tags.includes(tag)) this.tags.push(tag)
    })
  }

  removeTags(tags) {
    tags.forEach(tag => {
      var index = this.tags.indexOf(tag)
      if (index >= 0) this.tags.splice(index, 1)
    })
  }
}

module.exports = Record
