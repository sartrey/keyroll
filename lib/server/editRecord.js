const kernel = require('../kernel');

module.exports = async function editRecord(input) {
  const device = kernel.findDevice(input.device.name || 'localhost');
  const volumn = device.findVolumn({ name: input.volumn.name });
  if (!volumn) {
    throw new Error('volumn not found');
  }
  const secure = device.secure;
  const record = volumn.editRecord(input.record, secure);
  await device.commitChange();
  return { id: record.id };
}