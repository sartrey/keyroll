const fs = require('fs');
const path = require('path');
const util = require('util');
const Volumn = require('./Volumn');
const Secure = require('./Secure');

const exists = (p) => new Promise((resolve) => {
  fs.access(p, (error) => resolve(!error));
});
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const makeDir = util.promisify(fs.mkdir);

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
    this.format = '';
    this.secure = new Secure({});
    this.volumns = [];
  }

  getRootDir() {
    return path.join(this.root, '.keyroll');
  }

  getMetaPath() {
    return path.join(this.getRootDir(), 'meta');
  }

  getDataPath() {
    return path.join(this.getRootDir(), 'data');
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
    const volumn = this.findVolumn({ name: query.name });
    if (volumn) {
      const index = this.volumns.indexOf(volumn);
      this.volumns.splice(index, 1);
      this.commitChange();
    }
  }

  async commitChange() {
    // todo - debounce
    await this.saveData();
  }

  async loadMeta() {
    const meta = JSON.parse(await readFile(this.getMetaPath(), 'utf8'));
    this.format = meta.format;
    // todo - how to migrate
    this.secure = new Secure(meta.secure);
  }

  async loadData() {
    const data = JSON.parse(await readFile(this.getDataPath(), 'utf8'));
    this.volumns = data.volumns.map(e => new Volumn(e, this));
  }

  async saveMeta() {
    const meta = {
      format: this.format,
      secure: this.secure.toSourceJSON(),
    };
    await writeFile(this.getMetaPath(), JSON.stringify(meta));
  }

  async saveData() {
    const data = {
      volumns: this.volumns.map(e => e.toSourceJSON()),
    };
    await writeFile(this.getDataPath(), JSON.stringify(data));
  }

  async setup() {
    const rootDir = this.getRootDir();
    if (!(await exists(rootDir))) {
      await makeDir(rootDir, { recursive: true });
    }
    await this.saveMeta();
    await this.saveData();
  }
}

module.exports = Device;
