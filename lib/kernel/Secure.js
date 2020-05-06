const crypto = require('crypto');

class Secure {
  constructor(secure = {}) {
    this.secret = secure.secret; // scrypt(code)
    this.access = ''; // sha256(code)
    this.timestamp = secure.timestamp || Date.now();
  }

  toJSON() {
    return {
      secret: this.secret,
      timestamp: this.timestamp
    };
  }

  unlockByCode(code) {
    crypto.scrypt(code)
    // todo
    // 1. make secret
    // 2. test secret === scrypt(code)
    // 3. make access
  }

  lockByCode(code) {
    // todo
    // 1. make secret
    // 2. make access
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
