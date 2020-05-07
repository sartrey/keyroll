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
  constructor(secure = {}) {
    this.secret = secure.secret; // scrypt(code)
    this.access = ''; // sha256(code)
    this.timestamp = secure.timestamp || Date.now();
  }

  toSecureJSON() {
    return {
      secret: this.secret,
      timestamp: this.timestamp
    };
  }

  isLocked() {
    return !this.access;
  }

  isNotSet() {
    return !this.secret;
  }

  async unlockByCode(code) {
    const secret = await getSecretHash(code, this.timestamp);
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
    const secret = await getSecretHash(code, this.timestamp);
    // todo - validate expires
    this.secret = secret;
  }

  createSign() {
  }

  verifySign() {
  }

  encryptData() {
  }

  decryptData() {
  }
}

module.exports = Secure;
