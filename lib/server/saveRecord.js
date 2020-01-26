const Device = require('../shared/device');
const Record = require('../shared/record');

module.exports = async function saveRecord(input) {
  const { query, model } = input;
  const device = query.get('device') || 'localhost';
  const volumn = await Device.mountVolumn(device);
  const record = new Record(model);
  await volumn.insertOne(record);
  return { state: true };
}