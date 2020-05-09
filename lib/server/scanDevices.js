const kernel = require('../kernel');

module.exports = async function scanDevices(input) {
  const devices = await kernel.scanDevices();
  return Object.values(devices)
    .map(e => e.toSecureJSON());
}