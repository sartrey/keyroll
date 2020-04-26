const shared = require('../shared');

module.exports = async function findVolumns(input) {
  const { query } = input;
  const device = await shared.openDevice(query.device || 'localhost');
  const volumns = await device.findVolumns();
  const result = volumns.map(e => ({ domain: e.domain }));
  return { state: true, model: result };
}