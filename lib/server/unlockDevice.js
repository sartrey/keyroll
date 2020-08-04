const kernel = require('../kernel');

module.exports = async function unlockDevice(input) {
  const { name, code } = input.device;
  const device = kernel.findDevice(name);
  if (!device) {
    throw new Error('device not found');
  }
  const secure = device.secure;
  await secure.unlockByCode(code);
  return {
    name: device.name,
    secure: secure.toOpaqueJSON(),
  };
}