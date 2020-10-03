const kernel = require('../kernel');

module.exports = async function findRecords(input) {
  const device = await kernel.findDevice(input.device.name || 'localhost');
  const volumn = device.findVolumn({ name: input.volumn.name });
  if (!volumn) {
    throw new Error('volumn not found');
  }
  const records = await volumn.findRecords();
  return records.map(e => e.toSecureJSON());
}