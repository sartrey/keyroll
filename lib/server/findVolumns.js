const kernel = require('../kernel');

module.exports = async function findVolumns(input) {
  const { query } = input;
  const device = await kernel.openDevice(query.device || 'localhost');
  const volumns = await device.findVolumns();
  const result = volumns.map(e => e.toSecureJSON());
  return { state: true, model: result };
}