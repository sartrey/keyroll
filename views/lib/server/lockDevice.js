const kernel = require('../kernel');

module.exports = async function lockDevice(input) {
  const { name, code } = input.device;
  const device = kernel.findDevice(name);
  const secure = device.secure;
  await secure.lockByCode(code);
  await device.saveMeta();
  return {
    name: device.name,
    secure: secure.toOpaqueJSON(),
  };
}