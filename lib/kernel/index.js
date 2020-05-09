const os = require('os')
const Device = require('./Device');

const devices = {};

async function openDevice(name, source) {
  let device = devices[name];
  if (device) return device;
  device = new Device(name, source);
  devices[name] = device;
  await device.loadData();
  return device;
}

async function scanDevices() {
  // localhost
  const localhostPath = os.homedir() + '/.keyroll';
  await openDevice('localhost', localhostPath);
  // todo - find all portable devices like USB
  // todo - find all remote devices like cloud
  return devices;
}

function findDevice(name) {
  if (!name) {
    throw new Error('device name required');
  }
  return devices[name];
}

module.exports = {
  findDevice,
  scanDevices,
}