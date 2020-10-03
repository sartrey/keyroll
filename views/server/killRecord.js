const kernel = require('../kernel');

module.exports = async function killRecord(input) {
  const device = await kernel.findDevice(input.device.name || 'localhost');
  const volumn = await device.findVolumn({ name: input.volumn.name });
  volumn.killRecord(input.record.id);
  await device.commitChange();
}