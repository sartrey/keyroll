const Device = require('../shared/device');
const Record = require('../shared/record');

module.exports = async function saveRecordField(input) {
  const { query, body } = input;
  const device = query.get('device') || 'localhost';
  const volumn = await Device.mountVolumn(device);
  const record = volumn.selectOne({ domain: body.domain });
  if (!record) {
    return { state: false };
  }
  console.log('body', body);
  body.fields.forEach(field => {
    record.setField(field.key, field.value);
  });
  console.log(record);
  await volumn.commitChange();
  return { state: true };
}