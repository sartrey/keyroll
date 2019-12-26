const fs = require('fs');
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

  selectAll(query) {
    const { domain } = query;
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

  deleteOne(query) {
    // todo
    this.commitChange();
  }

  async reloadSource(dir, version) {
    this.datadir = dir.replace(/\/+$/, '');
    const datafile = path.join(dir, version || this.version);
    const data = JSON.parse(await readFile(datafile, 'utf8'));
    this.version = version;
    if (this.version !== latestVersion) {
      console.warn('volumn version not match');
    }
    this.records = data.records.map(item => new Record(item));
  }

  async commitChange() {
    this.changes ++;
    if (changes > 0) {
      const datafile = path.join(dir, version || this.version);
      const data = JSON.stringify({
        records: this.records
      });
      await writeFile(datafile);
      this.changes = 0;
    }
  }
}

module.exports = Volumn
