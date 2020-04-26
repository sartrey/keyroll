const shared = require('../shared');

module.exports = async function findRecord(input) {
  const { query } = input;
  const device = await shared.openDevice(query.device || 'localhost');
  const volumn = device.findVolumn({ domain: query.domain });
  if (!volumn) {
    return { state: false };
  }
  const record = await volumn.findRecordById(query.id);
  return { state: true, model: record };
}