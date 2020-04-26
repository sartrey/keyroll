const fs = require('fs');
const path = require('path');
const util = require('util');
const Volumn = require('./Volumn.js');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const latestVersion = 1;

class Device {
  constructor(connect) {
    this.changes = 0;
    this.connect = connect.replace(/\/+$/, '');
    this.version = latestVersion;
    this.volumns = [];
  }

  getDataFile() {
    return path.join(this.connect, 'data');
  }

  findVolumns(query) {
    const { domain } = query || {};
    if (domain) {
      return this.volumns.filter(e => e.domain === domain);
    }
    return this.volumns;
  }

  findVolumn(query) {
    return this.findVolumns(query)[0];
  }

  editVolumn(model) {
    if (!(model instanceof Volumn)) {
      throw new Error('Volumn type required');
    }
    if (!this.findVolumn({ domain: model.domain })) {
      this.volumns.push(model);
      this.commitChange();
    }
  }

  killVolumn(query) {
    // todo
    this.commitChange();
  }

  async loadData() {
    const data = JSON.parse(await readFile(this.getDataFile(), 'utf8'));
    this.version = data.version;
    if (this.version !== latestVersion) {
      console.warn('volumn version not match');
      // todo - the following means migrate
      this.version = latestVersion;
    }
    this.volumns = data.volumns.map(item => new Volumn(item));
  }

  async saveData() {
    const data = JSON.stringify({
      version: this.version,
      volumns: this.volumns
    });
    await writeFile(this.getDataFile(), data);
  }

  async commitChange() {
    this.changes ++;
    if (this.changes > 0) {
      await this.saveData();
      this.changes = 0;
    }
  }
}

module.exports = Device;
