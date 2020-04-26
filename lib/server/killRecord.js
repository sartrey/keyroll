const shared = require('../shared');

module.exports = async function killRecord(input) {
  const { query, model } = input;
  const device = await shared.openDevice(query.device || 'localhost');
  const volumn = await device.findVolumn(query);
  volumn.killRecord(model.id);
  await device.commitChange();
  return { state: true };
}