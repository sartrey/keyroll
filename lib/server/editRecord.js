const kernel = require('../kernel');

module.exports = async function editRecord(input) {
  const device = await kernel.findDevice(input.device.name || 'localhost');
  const volumn = device.findVolumn({ name: input.volumn.name });
  if (!volumn) {
    throw new Error('volumn not found');
  }
  const record = volumn.editRecord(input.record);
  await device.commitChange();
  return { id: record.id };
}