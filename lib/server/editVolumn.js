const kernel = require('../kernel');
const Volumn = require('../kernel/Volumn');

module.exports = async function editVolumn(input) {
  const { query, model } = input;
  const device = await kernel.openDevice(query.device || 'localhost');
  const volumn = new Volumn(model);
  await device.editVolumn(volumn);
}