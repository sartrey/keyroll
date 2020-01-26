const Device = require('../shared/device');
const Record = require('../shared/record');

module.exports = async function saveRecord(input) {
  const { query, body } = input;
  const device = query.get('device') || 'localhost';
  const volumn = await Device.mountVolumn(device);
  const model = new Record(body);
  await volumn.insertOne(model);
  return { state: true };
}