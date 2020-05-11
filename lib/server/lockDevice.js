const kernel = require('../kernel');

module.exports = async function lockDevice(input) {
  const { name, code } = input.device;
  const device = kernel.findDevice(name);
  if (!device) {
    throw new Error('device not found');
  }
  await device.protect.lockByCode(code);
  return device.toSecureJSON();
}