const shared = require('../shared');
const Volumn = require('../shared/Volumn');

module.exports = async function editVolumn(input) {
  const { query, model } = input;
  const device = await shared.openDevice(query.device || 'localhost');
  const volumn = new Volumn(model);
  await device.editVolumn(volumn);
  return { state: true };
}