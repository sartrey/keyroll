const os = require('os')
const Device = require('./Device');

const localhostConnect = os.homedir() + '/.keyroll';
const devices = {
  localhost: null
};

async function openDevice(name, conn) {
  let device = devices[name];
  if (device) return device;
  if (!conn) {
    if (name === 'localhost') {
      conn = localhostConnect;
    }
  }
  device = new Device(conn);
  await device.loadData()
    .catch(error => {
      console.log(error);
      device.commitChange()
    });
  devices[name] = device;
  return device;
}

async function scanDevices() {
  // localhost
  await openDevice('localhost', localhostConnect);
  // usb ?
  // remote ?
  return devices;
}

module.exports = {
  allDevices: devices,
  openDevice,
  scanDevices
}