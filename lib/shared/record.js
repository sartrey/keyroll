class Record {
  constructor(record) {
    if (!record || typeof(record) !== 'object') {
      throw new Error('invalid record');
    }
    if (typeof(record.domain) !== 'string' || record.domain.length === 0) {
      throw new Error('invalid record, domain required');
    }
    this.domain = record.domain;
    this.object = record.object || {};
    if (record.update) {
      this.update = new Date(record.update);
    } else {
      this.update = new Date();
    }
  }

  getDomain() {
    return this.domain;
  }

  getUpdate() {
    return this.update;
  }

  getValue(key) {
    return this.object[key];
  }

  setValue(key, value) {
    this.object[key] = value;
    this.update = new Date();
  }

  toJSONObject() {
    return {
      domain: this.domain,
      object: this.object,
      update: this.update.getTime()
    }
  }
}

module.exports = Record
