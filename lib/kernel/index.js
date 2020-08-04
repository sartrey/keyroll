const os = require('os');
const Device = require('./Device');

const devices = {};

async function openDevice(name, root) {
  let device = devices[name];
  if (device) return device;
  device = new Device(name, root);
  try {
    await device.loadMeta();
    await device.loadData();
  } catch (error) {
    // TODO - check error code for not found
    await device.setup();
  }
  devices[name] = device;
  return device;
}

async function scanDevices() {
  // localhost
  await openDevice('localhost', os.homedir());
  // todo - find all portable devices like usb
  // todo - find all remote devices like cloud
  return devices;
}

function findDevice(name) {
  const device = devices[name];
  if (!device) {
    throw new Error('device not found');
  }
  return device;
}

module.exports = {
  scanDevices,
  findDevice,
}