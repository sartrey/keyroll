const Device = require('../shared/device');
const Record = require('../shared/record');

module.exports = async function saveRecord(input) {
  const { query, body } = input;
  const model = new Record(JSON.parse(body));
  const volumn = await Device.mountVolumn(query.device || 'localhost');
  await volumn.insertOne(model);
  return { state: true, model: record };
}