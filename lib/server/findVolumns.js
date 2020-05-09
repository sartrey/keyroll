const kernel = require('../kernel');

module.exports = async function findVolumns(input) {
  const device = await kernel.findDevice(input.device.name);
  if (!device) {
    throw new Error('device not found');
  }
  const volumns = await device.findVolumns();
  const result = volumns.map(e => e.toSecureJSON());
  return result;
}