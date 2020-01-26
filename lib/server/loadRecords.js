const Device = require('../shared/device');

module.exports = async function loadRecords(input) {
  const { query } = input;
  const device = query.device || 'localhost';
  const volumn = await Device.mountVolumn(device);
  const records = await volumn.selectMany();
  return { state: true, model: records };
}