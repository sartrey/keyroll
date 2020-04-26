const shared = require('../shared');

module.exports = async function scanDevices(input) {
  const devices = await shared.scanDevices();
  return { state: true, model: devices };
}