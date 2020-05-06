const os = require('os')
const Device = require('./Device');

const localhostPath = os.homedir() + '/.keyroll';
const devices = {
  localhost: null
};

async function openDevice(name, source) {
  console.log(name, source);
  let device = devices[name];
  if (device) return device;
  device = new Device(source);
  await device.loadData();
  devices[name] = device;
  return device;
}

async function scanDevices() {
  // localhost
  await openDevice('localhost', localhostPath);
  // todo - find all portable devices like USB
  // todo - find all remote devices like cloud
  return devices;
}

async function unlockDevice(name, code) {
}

module.exports = {
  allDevices: devices,
  openDevice,
  scanDevices,
  unlockDevice
}