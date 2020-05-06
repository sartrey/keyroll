const fs = require('fs');
const path = require('path');
const util = require('util');
const Volumn = require('./Volumn');
const Secure = require('./Secure');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const latestVersion = 2;

class Device {
  constructor(source) {
    if (!source || source.length === 0) {
      throw new Error('source required');
    }
    this.change = 0;
    this.source = source;
    this.secure = null;
    this.version = latestVersion;
    this.volumns = [];
  }

  getDataFile() {
    return path.join(this.source, 'data');
  }

  findVolumns(query) {
    const { name } = query || {};
    if (name) {
      return this.volumns.filter(e => e.name === name);
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
    if (!this.findVolumn({ name: model.name })) {
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
    console.log(data)
    this.version = data.version;
    if (this.version !== latestVersion) {
      console.warn('volumn version not match');
      // todo - migrate
      this.version = latestVersion;
    }
    this.secure = new Secure(data.secure);
    this.volumns = data.volumns.map(item => new Volumn(item));
  }

  async saveData() {
    const data = JSON.stringify({
      secure: this.secure.toJSON(),
      version: this.version,
      volumns: this.volumns
    });
    await writeFile(this.getDataFile(), data);
  }

  async commitChange() {
    this.change ++;
    if (this.change > 0) {
      await this.saveData();
      this.change = 0;
    }
  }
}

module.exports = Device;
