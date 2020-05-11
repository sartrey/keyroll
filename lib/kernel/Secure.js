const crypto = require('crypto');

function getSecretHash(code, time) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(code, time.toString(), 64, (error, result) => {
      if (error) return reject(error);
      resolve(result.toString('base64'));
    });
  });
}

function getAccessHash(data) {
  const hasher = crypto.createHash('sha256');
  hasher.update(data);
  return hasher.digest('base64');
}

class Secure {
  constructor(model = {}) {
    this.update = model.update || Date.now();
    this.secret = model.secret; // scrypt(code)
    this.access = ''; // sha256(code)
  }

  toSourceJSON() {
    return {
      update: this.update,
      secret: this.secret,
    };
  }

  toSecureJSON() {
    return {
      locked: this.isLocked(),
      secret: this.isSecret(),
    };
  }

  isLocked() {
    return !this.access;
  }

  isSecret() {
    return !!this.secret;
  }

  async unlockByCode(code) {
    const secret = await getSecretHash(code, this.update);
    console.log(secret);
    if (this.secret !== secret) {
      throw new Error('secret not matched');
    }
    // todo - validate expires
    this.access = getAccessHash(code);
  }

  async lockByCode(code) {
    if (!code && this.secret) {
      this.access = '';
      return;
    }
    // todo - validate code strength
    const secret = await getSecretHash(code, this.update);
    // todo - validate expires
    this.secret = secret;
  }

  createSign() {
  }

  verifySign() {
  }

  cipherData(data) {
    const aesKey = this.access.substr(0, 24);
    const aesIV = Buffer.alloc(16, this.update.toString());
    const cipher = crypto.createCipheriv('aes-192-cbc', aesKey, aesIV);
    let result = cipher.update(data, 'utf8', 'base64');
    result += cipher.final('base64');
    return result;
  }

  decipherData(data) {
    const aesKey = this.access.substr(0, 24);
    const aesIV = Buffer.alloc(16, this.update.toString());
    const decipher = crypto.createDecipheriv('aes-192-cbc', aesKey, aesIV);
    let result = decipher.update(data, 'base64', 'utf8');
    result += decipher.final('utf8');
    return result;
  }
}

module.exports = Secure;
