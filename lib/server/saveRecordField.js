const Device = require('../shared/device');
const Record = require('../shared/record');

module.exports = async function saveRecordField(input) {
  const { query, model } = input;
  const device = query.device || 'localhost';
  const volumn = await Device.mountVolumn(device);
  const record = volumn.selectOne({ domain: query.domain });
  if (!record) {
    return { state: false };
  }
  record.setField(model.field.id, model.field.key, model.field.value);
  await volumn.commitChange();
  return { state: true };
}