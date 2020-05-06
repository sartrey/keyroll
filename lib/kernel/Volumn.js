const Record = require('./Record');

class Volumn {
  constructor(model = {}) {
    if (typeof(model.name) !== 'string' || model.name.length === 0) {
      if (typeof(model.domain) === 'string' && model.domain.length > 0) {
        model.name = model.domain;
      } else {
        throw new Error('name required');
      }
    }
    this.name = model.name;
    this.domains = model.domains || [];
    this.records = model.records || [];
  }

  toSecureJSON() {
    return {
      name: this.name,
      domains: this.domains
    };
  }

  findRecords(query) {
    const { type, name } = query || {};
    let records = this.records;
    if (type) {
      records = records.filter(e => e.type === type);
    }
    if (name) {
      records = records.filter(e => e.name.indexOf(name) >= 0);
    }
    return records;
  }

  findRecordById(id) {
    return this.records.find(e => e.id === id);
  }

  editRecord(id, type, name, value) {
    let record;
    if (id) {
      record = this.records.find(e => e.id === id);
      if (!record) {
        throw new Error('record not found');
      }
      // todo - type not support
      record.name = name;
      record.value = value;
    } else {
      record = new Record({ type, name, value });
      this.records.push(record);
    }
    return record;
  }

  killRecord(id) {
    const i = this.records.findIndex(e => e.id === id);
    this.records.splice(i, 1);
  }
}

module.exports = Volumn;
