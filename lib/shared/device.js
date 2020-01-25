const os = require('os')
const path = require('path')
const Volumn = require('./volumn');

const devices = {
  localhost: null
};

async function mountVolumn(name, dir) {
  let volumn = devices[name];
  if (volumn) return volumn;
  volumn = new Volumn();
  await volumn.reloadSource(dir).catch(error => volumn.commitChange());
  devices[name] = volumn;
}

async function scanDevices() {
  // localhost
  await mountVolumn('localhost', path.join(os.homedir(), '.keyroll'))
  // usb ?
  // remote ?
  return devices;
}

module.exports = {
  allDevices: devices,
  mountVolumn,
  scanDevices
}