const Record = require('./Record');

class Volumn {
  constructor(model = {}, context) {
    this.context = context;
    this.fillModel(model);
  }

  fillModel(model) {
    if (typeof(model.name) !== 'string' || model.name.length === 0) {
      throw new Error('name required');
    }
    this.name = model.name;
    this.domains = model.domains || [];
    this.records = model.records.map(e => new Record(e, this));
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

  editRecord(model) {
    let record;
    if (model.id) {
      record = this.records.find(e => e.id === model.id);
      if (!record) {
        throw new Error('record not found');
      }
      record.fillModel(model)
    } else {
      record = new Record(model, this);
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
