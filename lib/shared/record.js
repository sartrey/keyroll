const nanoid = require('nanoid');

class Record {
  constructor(record) {
    if (!record || typeof(record) !== 'object') {
      throw new Error('invalid record');
    }
    if (typeof(record.domain) !== 'string' || record.domain.length === 0) {
      throw new Error('invalid record, domain required');
    }
    this.domain = record.domain;
    this.fields = record.fields || [];
    if (record.update) {
      this.update = record.update;
    } else {
      this.update = Date.now();
    }
  }

  getDomain() {
    return this.domain;
  }

  getUpdate() {
    return this.update;
  }

  getFields() {
    return this.fields;
  }

  getFieldsByKey(key) {
    return this.fields.filter(e => e.key === key);
  }

  getFieldById(id) {
    return this.fields.find(e => e.id === id);
  }

  setField(id, key, value) {
    const field = this.fields.find(e => e.id === id);
    if (field) {
      if (!key) {
        const i = this.fields.indexOf(field);
        this.fields.splice(i, 1);
      } else {
        field.key = key;
        field.value = value;
      }
    } else {
      this.fields.push({ key, value, id: nanoid() });
    }
    this.update = Date.now();
  }
}

module.exports = Record;
