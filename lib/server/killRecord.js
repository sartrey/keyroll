const kernel = require('../kernel');

module.exports = async function killRecord(input) {
  const { query, model } = input;
  const device = await kernel.openDevice(query.device || 'localhost');
  const volumn = await device.findVolumn({ volumn: query.volumn });
  volumn.killRecord(model.id);
  await device.commitChange();
}