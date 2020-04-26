const shared = require('../shared');

module.exports = async function findRecords(input) {
  const { query } = input;
  const device = await shared.openDevice(query.device || 'localhost');
  const volumn = device.findVolumn({ domain: query.domain });
  if (!volumn) {
    return { state: false };
  }
  const records = await volumn.findRecords();
  return { state: true, model: records };
}