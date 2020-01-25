const Device = require('../shared/device');

module.exports = async function scanDevices(input) {
  const devices = await Device.scanDevices();
  return { state: true, model: devices };
}