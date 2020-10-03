const kernel = require('../kernel');

module.exports = async function findRecord(input) {
  const { query } = input;
  const device = await kernel.openDevice(query.device || 'localhost');
  const volumn = device.findVolumn({ volumn: query.volumn });
  if (!volumn) {
    throw new Error('volumn not found');
  }
  const record = await volumn.findRecordById(query.id);
  return record;
}