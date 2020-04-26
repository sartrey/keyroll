const kernel = require('../kernel');

module.exports = async function findRecord(input) {
  const { query } = input;
  const device = await kernel.openDevice(query.device || 'localhost');
  const volumn = device.findVolumn({ domain: query.domain });
  if (!volumn) {
    return { state: false };
  }
  const record = await volumn.findRecordById(query.id);
  return { state: true, model: record };
}