module.exports = {
}

const os = require('os')
const path = require('path')
const { Volumn } = require('../')

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