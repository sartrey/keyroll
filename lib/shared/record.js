const nanoid = require('nanoid');

class Record {
  constructor(record) {
    if (!record || typeof(record) !== 'object') {
      throw new Error('invalid record');
    }
    if (typeof(record.name) !== 'string' || record.name.length === 0) {
      throw new Error('invalid record, name required');
    }
    this.id = record.id || nanoid(12);
    this.type = record.type;
    this.name = record.name;
    this.value = record.value;
  }
}

module.exports = Record;
