class Record {
  constructor(record) {
    if (!record) record = {}
    this.domain = record.domain;
    this.object = record.object;
  }

  getValue(key) {
    return this.object[key];
  }

  setValue(key, value) {
    this.object[key] = value;
  }
}

module.exports = Record
