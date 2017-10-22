'use strict'

module.exports = {
  use: async function (volumn, search) {
    if (volumn) return volumn
    var { root } = search
    // auto logout while lock screen + timeout
  },

  get: async function (volumn, search) {
    var { uuid, tags } = search
    if (!uuid && !tags) throw new Error('illegal search')
    if (uuid) {
      let record = volumn.single({ uuid })
      console.log('record', record)
    } else {
      let records = volumn.filter({ tags })
      console.log('records', records.map(e => ({ uuid: e.uuid, tags: e.tags })))
    }
  },

  set: async function (volumn, search) {
    var { uuid, data } = search
    if (!uuid && !data) throw new Error('empty record')
    var record = uuid ? volumn.single({ uuid }) : volumn.insert()
    record.setData(data)
    await volumn.commit()
    console.log('record', record)
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
