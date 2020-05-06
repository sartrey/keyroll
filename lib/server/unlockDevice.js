const kernel = require('../kernel');

module.exports = async function unlockDevice(input) {
  const { query } = input;
  const { name, code } = query;
  const device = await kernel.unlockDevice();
  return { state: true, model: devices };
}