const kernel = require('../kernel');

module.exports = async function scanDevices(input) {
  const devices = await kernel.scanDevices();
  return { state: true, model: devices };
}