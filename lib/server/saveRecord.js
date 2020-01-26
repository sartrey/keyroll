const Device = require('../shared/device');
const Record = require('../shared/record');

module.exports = async function saveRecord(input) {
  const { query, model } = input;
  const device = query.device || 'localhost';
  const volumn = await Device.mountVolumn(device);
  const record = new Record(model.record);
  await volumn.insertOne(record);
  return { state: true };
}