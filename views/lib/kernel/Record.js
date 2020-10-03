const { nanoid } = require('nanoid');

class Record {
  constructor(model = {}) {
    this.id = model.id || nanoid(12);
    this.type = model.type || 'text';
    this.name = model.name;
    this.seal = model.seal;
    this.value = model.value;
  }

  updateValue(value, seal, secure) {
    if (seal === true) {
      if (value !== undefined) {
        this.value = secure.cipherData(value);
      } else {
        if (!this.seal && this.value !== undefined) {
          this.value = secure.cipherData(this.value);
        }
      }
      this.seal = true;
    } else {
      if (value !== undefined) {
        this.value = value;
      } else {
        if (this.seal && this.value !== undefined) {
          this.value = secure.decipherData(this.value);
        }
      }
      this.seal = false;
    }
  }

  toSourceJSON() {
    return {
      id: this.id,
      seal: this.seal,
      type: this.type,
      name: this.name,
      value: this.value
    };
  }

  toSecureJSON() {
    return {
      id: this.id,
      seal: this.seal,
      type: this.type,
      name: this.name,
      value: !this.seal ? this.value : null
    };
  }
}

module.exports = Record;
