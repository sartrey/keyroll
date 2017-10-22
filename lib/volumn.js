'use strict'

const fs = require('fs')
const path = require('path')
const util = require('util')
const Record = require('./record.js')

const exists = function (p) {
  return new Promise((resolve, reject) => {
    fs.access(p, error => resolve(!error))
  })
}
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

class Volumn {
  constructor() {
    this.change = 0
    this.records = []
    this.source = ''
    this.version = 0
  }

  single(query) {
    return this.filter(query)[0]
  }

  filter(query) {
    var { uuid, tags } = query
    if (uuid) return this.records.filter(e => e.uuid === uuid)
    if (tags) return this.records.filter(e => e.hasTags(tags))
    return []
  }

  insert() {
    var record = new Record()
    this.records.push(record)
    this.change ++
    return record
  }

  delete() {
  }

  async reload(source) {
    source = source.replace(/\/+$/, '')
    var metaPath = source + '.meta'
    var dataPath = source + '.data'
    this.source = source
    var metaBody = await readFile(metaPath, 'utf8')
    var meta = JSON.parse(metaBody)
    this.version = meta.version
    if (this.version !== 0) {
      // todo: upgrade source ?
    }
    var dataBody = await readFile(dataPath, 'utf8')
    this.records = JSON.parse(dataBody).map(item => new Record(item))
  }

  async commit() {
    var sourceDir = path.dirname(this.source)
    var existsDir = await exists(sourceDir)
    if (!existsDir) fs.mkdirSync(sourceDir)
    var metaPath = this.source + '.meta'
    var dataPath = this.source + '.data'
    var metaBody = JSON.stringify({ version: this.version })
    var dataBody = JSON.stringify(this.records)
    await writeFile(metaPath, metaBody)
    await writeFile(dataPath, dataBody)
    this.change = 0
  }
}

module.exports = Volumn
