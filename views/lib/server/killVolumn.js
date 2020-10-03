const kernel = require('../kernel');

module.exports = async function killVolumn(input) {
  const device = await kernel.findDevice(input.device.name);
  device.killVolumn({ name: input.volumn.name });
  await device.commitChange();
}