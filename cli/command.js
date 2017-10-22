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
    // get uuid by tags, error when many results
    var record = volumn.filter({ uuid })
    console.log('record', record)
  },

  set: async function (volumn, search) {
    var { uuid, tags, data } = search
    if (!uuid && !tags && !data) throw new Error('empty record')
    var record = uuid ? volumn.filter({ uuid }) : volumn.insert()
    record.setData(data)
    await volumn.commit()
    console.log('record', record)
    // todo: --delete means
    // volumn.delete()  
  },

  tag: async function (volumn, search) {
    var volumn = utility.getCurrentVolumn()
    var record = volumn.access(uuid)
    record.appendTags(tag)
    // todo: --delete means
    // record.removeTags()
    }
}
