const kernel = require('../kernel');

module.exports = async function killRecord(input) {
  const { query, model } = input;
  const device = await kernel.openDevice(query.device || 'localhost');
  const volumn = await device.findVolumn(query);
  volumn.killRecord(model.id);
  await device.commitChange();
  return { state: true };
}