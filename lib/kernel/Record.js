const nanoid = require('nanoid');

class Record {
  constructor(model = {}, context) {
    this.context = context;
    this.fillModel(model);
  }

  fillModel(model) {
    this.id = model.id || nanoid(12);
    if (typeof(model.name) !== 'string' || model.name.length === 0) {
      throw new Error('record name required');
    }
    this.name = model.name;
    if (this.type && model.type && model.type !== this.type) {
      throw new Error('record type not editable');
    }
    this.type = model.type;
    if (model.seal) {
      // seal any => true
      const secure = this.context.context.protect;
      this.value = secure.cipherData(model.value);
    } else if (this.seal) {
      // seal true => false
      const secure = this.context.context.protect;
      if (model.value) {
        this.value = model.value;
      } else {
        this.value = secure.decipherData(this.value);
      }
    } else {
      // seal true => true
      this.value = model.value;
    }
    this.seal = model.seal || false;
    console.log(model, this.toSecureJSON());
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

  getRawValue() {
    if (!this.seal) return this.value;
    const secure = this.context.context.protect;
    return secure.decipherData(this.value);
  }
}

module.exports = Record;
