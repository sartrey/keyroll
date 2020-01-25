const Device = require('../shared/device');

module.exports = async function loadRecords(input) {
  const { query } = input;
  const volumn = await Device.mountVolumn(query.device || 'localhost');
  const records = await volumn.selectMany();
  return { state: true, model: records };
}