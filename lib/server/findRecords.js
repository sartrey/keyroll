const kernel = require('../kernel');

module.exports = async function findRecords(input) {
  const { query } = input;
  const device = await kernel.openDevice(query.device || 'localhost');
  const volumn = device.findVolumn({ name: query.volumn });
  if (!volumn) {
    throw new Error('volumn not found');
  }
  const records = await volumn.findRecords();
  return records;
}