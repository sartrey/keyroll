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

  getField(key) {
    return this.fields.find(e => e.key === key);
  }

  setField(key, value) {
    const field = this.fields.find(e => e.key === key);
    if (field) {
      field.key = key;
      field.value = value;
    } else {
      this.fields.push({ key, value });
    }
    this.update = Date.now();
  }
}

module.exports = Record;
