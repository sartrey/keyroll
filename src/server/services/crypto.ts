import { randomBytes, scrypt, scryptSync, createCipheriv, createDecipheriv } from 'node:crypto';

import { customAlphabet } from 'nanoid';

/**
 * 加密算法参数
 */
export const CRYPTO_PARAMS = {
  scrypt: {
    N: 16384, // 2^14
    r: 8,
    p: 1,
    keyLength: 32
  },
  aes: {
    keyLength: 32,  // 256 位
    ivLength: 12,   // 96 位
    authTagLength: 16  // 128 位
  }
};

/**
 * 生成 MasterKey（随机 256 位）
 */
export function generateMasterKey(): Buffer {
  return randomBytes(32);
}

/**
 * 生成 RecoveryCode（5 组 4 位大写字符 + 数字）
 * 格式：A1B2-C3D4-E5F6-G7H8-I9J0
 */
const generateRecoveryCodeChar = customAlphabet('0123456789ABCDEFGHIJ', 4);

export function generateRecoveryCode(): string {
  const groups: string[] = [];
  for (let i = 0; i < 5; i++) {
    groups.push(generateRecoveryCodeChar());
  }
  return groups.join('-');
}

/**
 * 生成随机 Salt（32 字节）
 * 使用 crypto.randomBytes 保证加密安全性
 */
export function generateSalt(): Buffer {
  return randomBytes(32);
}

/**
 * 生成 RecoverySeed（32 字节）
 * 使用 crypto.randomBytes 保证加密安全性
 */
export function generateRecoverySeed(): Buffer {
  return randomBytes(32);
}

/**
 * 通过 scrypt 派生密钥（用于加密/解密）
 * @param password - Password 或 RecoveryCode
 * @param salt - passwordSalt 或 recoverySeed
 * @returns 派生的 32 字节密钥
 */
export function deriveKey(password: string, salt: Buffer): Buffer {
  return scryptSync(password, salt, CRYPTO_PARAMS.scrypt.keyLength, {
    N: CRYPTO_PARAMS.scrypt.N,
    r: CRYPTO_PARAMS.scrypt.r,
    p: CRYPTO_PARAMS.scrypt.p
  });
}

/**
 * 通过 scrypt 派生密钥（异步版本）
 */
export async function deriveKeyAsync(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, CRYPTO_PARAMS.scrypt.keyLength, {
      N: CRYPTO_PARAMS.scrypt.N,
      r: CRYPTO_PARAMS.scrypt.r,
      p: CRYPTO_PARAMS.scrypt.p
    }, (err, derivedKey) => {
      if (err) { reject(err); } else { resolve(derivedKey); }
    });
  });
}

/**
 * 加密 MasterKey（用于存储）
 * @param masterKey - MasterKey Buffer
 * @param key - 加密密钥（通过 deriveKey 派生）
 * @returns base64 编码的加密数据（IV + ciphertext + authTag）
 */
export function encryptMasterKey(masterKey: Buffer, key: Buffer): string {
  const iv = randomBytes(CRYPTO_PARAMS.aes.ivLength);
  const cipher = createCipheriv('aes-256-gcm', key, iv);

  let ciphertext = cipher.update(masterKey);
  ciphertext = Buffer.concat([ciphertext, cipher.final()]);

  const authTag = cipher.getAuthTag();

  // IV || ciphertext || authTag
  const encrypted = Buffer.concat([iv, ciphertext, authTag]);
  return encrypted.toString('base64');
}

/**
 * 解密 MasterKey（从存储加载）
 * @param encryptedBase64 - base64 编码的加密数据
 * @param key - 加密密钥（通过 deriveKey 派生）
 * @returns MasterKey Buffer
 * @throws Error 如果解密失败（authTag 验证不通过）
 */
export function decryptMasterKey(encryptedBase64: string, key: Buffer): Buffer {
  const encrypted = Buffer.from(encryptedBase64, 'base64');

  const iv = encrypted.subarray(0, CRYPTO_PARAMS.aes.ivLength);
  const authTag = encrypted.subarray(-CRYPTO_PARAMS.aes.authTagLength);
  const ciphertext = encrypted.subarray(
      CRYPTO_PARAMS.aes.ivLength,
      encrypted.length - CRYPTO_PARAMS.aes.authTagLength
  );

  const decipher = createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(authTag);

  let plaintext = decipher.update(ciphertext);
  plaintext = Buffer.concat([plaintext, decipher.final()]);

  return plaintext;
}

/**
 * 计算 Password 登录哈希
 * @param password - Password（6 位数字）
 * @param salt - passwordSalt
 * @returns base64 编码的哈希值
 */
export function computePasswordHash(password: string, salt: Buffer): string {
  const key = deriveKey(password, Buffer.from('signin' + salt.toString('base64')));
  return key.toString('base64');
}

/**
 * 验证 Password 登录哈希
 * @param password - Password（6 位数字）
 * @param salt - passwordSalt
 * @param storedHash - 存储的 passwordHash
 * @returns true 如果验证通过
 */
export function verifyPasswordHash(password: string, salt: Buffer, storedHash: string): boolean {
  const computedHash = computePasswordHash(password, salt);
  return computedHash === storedHash;
}

/**
 * 验证 Password 格式（6 位数字）
 */
export function isValidPassword(password: string): boolean {
  return /^\d{6}$/.test(password);
}

/**
 * 验证 RecoveryCode 格式（5 组 4 位大写字符 + 数字）
 */
export function isValidRecoveryCode(code: string): boolean {
  return /^[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}$/.test(code);
}
