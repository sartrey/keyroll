const kernel = require('../kernel');

module.exports = async function unlockDevice(input) {
  const { name, code } = input.device;
  const device = kernel.findDevice(name);
  if (!device) {
    throw new Error('device not found');
  }
  await device.secure.unlockByCode(code);
  return device.toSecureJSON();
}