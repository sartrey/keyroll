const fs = require('fs');
const path = require('path');
const util = require('util');
const Volumn = require('./Volumn');
const Secure = require('./Secure');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const latestVersion = 3;

class Device {
  constructor(name, root) {
    if (!name || name.length === 0) {
      throw new Error('name required');
    }
    if (!root || root.length === 0) {
      throw new Error('root required');
    }
    this.name = name;
    this.root = root;
    this.change = 0;
    this.version = latestVersion;
    this.protect = new Secure({});
    this.volumns = [];
  }

  toSourceJSON() {
    return {
      version: this.version,
      protect: this.protect.toSourceJSON(),
      volumns: this.volumns.map(e => e.toSourceJSON()),
    };
  }
  
  toSecureJSON() {
    return {
      name: this.name,
      size: this.volumns.length,
      protect: this.protect.toSecureJSON(),
    };
  }

  getDataFile() {
    return path.join(this.root, 'data');
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
    this.version = data.version;
    if (this.version !== latestVersion) {
      console.warn('volumn version not match');
      // todo - migrate
      this.version = latestVersion;
    }
    this.protect = new Secure(data.protect);
    this.volumns = data.volumns.map(e => new Volumn(e, this));
  }

  async saveData() {
    const data = JSON.stringify(this.toSourceJSON());
    await writeFile(this.getDataFile(), data);
  }

  async commitChange() {
    this.change ++;
    // todo - debounce
    if (this.change > 0) {
      await this.saveData();
      this.change = 0;
    }
  }
}

module.exports = Device;
