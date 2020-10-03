const kernel = require('../kernel');
const Volumn = require('../kernel/Volumn');

module.exports = async function editVolumn(input) {
  const device = await kernel.findDevice(input.device.name);
  const volumn = new Volumn(input.volumn);
  await device.editVolumn(volumn);
}