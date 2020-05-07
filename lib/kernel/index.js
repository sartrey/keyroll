const os = require('os')
const Device = require('./Device');

const devices = [];

async function openDevice(name, source) {
  let device = devices.find(e => e.name === name);
  if (device) return device;
  device = new Device(name, source);
  await device.loadData();
  devices.push(device);
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

async function unlockDevice(name, code) {
  const device = devices.find(e => e.name === name);
  if (!device) {
    throw new Error('device not found');
  }
  await device.secure.unlockByCode(code);
  // todo - device.commitChange
  return device;
}

async function lockDevice(name, code) {
  const device = devices.find(e => e.name === name);
  if (!device) {
    throw new Error('device not found');
  }
  await device.secure.lockByCode(code);
  // todo - device.commitChange
  return device;
}

module.exports = {
  allDevices: devices,
  openDevice,
  scanDevices,
  unlockDevice,
  lockDevice
}