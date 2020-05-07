const kernel = require('../kernel');

module.exports = async function lockDevice(input) {
  const { query } = input;
  const { name, code } = query;
  const device = await kernel.lockDevice(name, code);
  return device.toSecureJSON();
}