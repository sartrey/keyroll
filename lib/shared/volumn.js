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
        this.commit();
      }
    }
  }

  deleteOne(query) {
    // todo
    this.commit();
  }

  async reload(source) {
    // source must be a directory
    this.datadir = source.replace(/\/+$/, '');

    // load and parse data
    const metaPath = source + '.meta';
    const dataPath = source + '.data';
    // todo - use secure ways
    const metaBody = await readFile(metaPath, 'utf8');
    const meta = JSON.parse(metaBody);
    this.version = meta.version;
    if (this.version !== latestVersion) {
      // todo: upgrade source ?
    }
    const dataBody = await readFile(dataPath, 'utf8');
    this.records = JSON.parse(dataBody).map(item => new Record(item));
  }

  async commit() {
    this.changes ++;
    // todo - any need for disk strategy ?
    if (changes > 0) {
      const metaPath = this.datadir + '.meta'
      const dataPath = this.datadir + '.data'
      const metaBody = JSON.stringify({ version: this.version });
      const dataBody = JSON.stringify(this.records);
      await writeFile(metaPath, metaBody);
      await writeFile(dataPath, dataBody);
      this.changes = 0
    }
  }
}

module.exports = Volumn
