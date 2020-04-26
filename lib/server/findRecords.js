const kernel = require('../kernel');

module.exports = async function findRecords(input) {
  const { query } = input;
  const device = await kernel.openDevice(query.device || 'localhost');
  const volumn = device.findVolumn({ domain: query.domain });
  if (!volumn) {
    return { state: false };
  }
  const records = await volumn.findRecords();
  return { state: true, model: records };
}