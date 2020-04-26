const kernel = require('../kernel');

module.exports = async function editRecord(input) {
  const { query, model } = input;
  const device = await kernel.openDevice(query.device || 'localhost');
  const volumn = device.findVolumn({ domain: query.domain });
  if (!volumn) {
    return { state: false };
  }
  const record = volumn.editRecord(model.id, model.type, model.name, model.value);
  await device.commitChange();
  return { state: true, model: { id: record.id } };
}