const fs = require('fs');
const path = require('path');
const util = require('util');
const Record = require('./record.js');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const latestVersion = 0;

class Volumn {
  constructor() {
    this.records = [];
    this.version = latestVersion;
    this.datadir = null;
    this.changes = 0;
  }

  selectOne(query) {
    return this.selectMany(query)[0];
  }

  selectMany(query) {
    const { domain } = query || {};
    if (domain) {
      return this.records.filter(e => e.domain === domain);
    }
    return this.records;
  }

  insertOne(model) {
    if (model instanceof Record) {
      if (!this.selectOne({ domain: model.domain })) {
        this.records.push(model);
        this.commitChange();
      }
    }
  }

  updateOne(model) {
    // todo
    this.commitChange();
  }

  deleteOne(query) {
    // todo
    this.commitChange();
  }

  async reloadSource(dir) {
    this.datadir = dir.replace(/\/+$/, '');
    const datafile = path.join(dir, 'data');
    const data = JSON.parse(await readFile(datafile, 'utf8'));
    this.version = data.version;
    if (this.version !== latestVersion) {
      console.warn('volumn version not match');
      // todo - the following means migrate
      this.version = latestVersion;
    }
    this.records = data.records.map(item => new Record(item));
  }

  async commitChange() {
    this.changes ++;
    if (this.changes > 0) {
      const datafile = path.join(this.datadir, 'data');
      const data = JSON.stringify({
        version: this.version,
        records: this.records
      });
      await writeFile(datafile, data);
      this.changes = 0;
    }
  }
}

module.exports = Volumn;
