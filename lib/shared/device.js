const os = require('os')
const path = require('path')
const Volumn = require('./volumn');

const devices = {
  localhost: null
};
const localhostDir = path.join(os.homedir(), '.keyroll');

async function mountVolumn(name, dir) {
  let volumn = devices[name];
  if (volumn) return volumn;
  volumn = new Volumn();
  if (name === 'localhost') {
    dir = localhostDir;
  }
  await volumn.reloadSource(dir).catch(error => {
    console.log(error);
    volumn.commitChange()
  });
  devices[name] = volumn;
}

async function scanDevices() {
  // localhost
  await mountVolumn('localhost');
  // usb ?
  // remote ?
  return devices;
}

module.exports = {
  allDevices: devices,
  mountVolumn,
  scanDevices
}