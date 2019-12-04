'use strict'

const console = require('./console.js')
const logger = console.logger

module.exports = {
  use: async function (volumn, search) {
    var { root } = search
    // auto logout while lock screen + timeout
  },

  get: async function (volumn, search, enable) {
    var { uuid, tags } = search
    if (!uuid && !tags) {
      let records = volumn.filter({})
      logger.info(records.length, 'record(s) found')
      records.forEach((e, i) => {
        logger.done(`<${i + 1}> ${e.uuid} ${e.tags}`)
      })
    } else if (uuid) {
      let record = volumn.single({ uuid })
      if (!record) {
        logger.warn('record not found')
      } else {
        if (enable.verbose) logger.done(record)
        else logger.done(record.data)
      }
    } else if (tags) {
      let records = volumn.filter({ tags })
      logger.info(records.length, 'record(s) found')
      records.forEach((e, i) => {
        logger.done(`<${i + 1}> ${e.uuid} `)
      })
    }
  },

  set: async function (volumn, search, enable) {
    var { uuid, data, tags } = search
    if (!uuid && !data) throw new Error('empty record')
    var record = uuid ? volumn.single({ uuid }) : volumn.insert()
    if (!record) throw new Error('record not found')
    record.setData(data)
    if (tags) record.addTags(tags)
    await volumn.commit()
    if (enable.verbose) logger.done(record)
    else logger.done(`${record.uuid} ${uuid ? 'updated' : 'created'}`)    
    // todo: --delete means
    // volumn.delete()  
  },

  tag: async function (volumn, search) {
    var { uuid, tags } = search
    if (!uuid) throw new Error('illegal search')
    var record = volumn.single({ uuid })
    if (!record) throw new Error('record not found')
    record.addTags(tags)
    await volumn.commit()
    console.log('record', record)
    // todo: --delete means
    // record.removeTags()
    }
}
