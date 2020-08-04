const Record = require('./Record');

class Volumn {
  constructor(model = {}) {
    if (typeof(model.name) !== 'string' || model.name.length === 0) {
      throw new Error('name required');
    }
    this.name = model.name;
    this.domains = model.domains || [];
    if (!model.records) model.records = [];
    this.records = model.records.map(e => new Record(e));
  }

  toSourceJSON() {
    return {
      name: this.name,
      domains: this.domains,
      records: this.records.map(e => e.toSourceJSON())
    }
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

  editRecord(model, secure) {
    console.log(model, secure);
    let record;
    if (model.id) {
      record = this.records.find(e => e.id === model.id);
      if (!record) {
        throw new Error('record not found');
      }
      record.updateValue(model.value, model.seal, secure);
    } else {
      console.log('create record');
      record = new Record(model);
      console.log(record);
      if (model.seal) {
        record.updateValue(model.value, model.seal, secure);
      }
      this.records.push(record);
    }
    console.log(this.records);
    return record;
  }

  killRecord(id) {
    const i = this.records.findIndex(e => e.id === id);
    this.records.splice(i, 1);
  }
}

module.exports = Volumn;
