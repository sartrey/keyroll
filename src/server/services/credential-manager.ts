import { join } from 'node:path';
import { homedir } from 'node:os';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

import {
  generateMasterKey,
  generateRecoveryCode,
  generateSalt,
  generateRecoverySeed,
  deriveKey,
  encryptMasterKey,
  decryptMasterKey,
  computePasswordHash,
  isValidPassword
} from './crypto.js';

/**
 * Passkey 凭证数据
 */
export interface IPasskeyCredential {
  credentialId: string;
  publicKey: string;  // base64 编码的 SPKI 格式公钥
  counter: number;
  transports: string[];  // ['internal', 'usb', 'nfc', 'ble', 'hybrid']
  createdAt: number;
}

/**
 * Password 凭证数据
 */
export interface IPasswordCredential {
  passwordSalt: string;  // base64 编码
  masterKeySecret: string;  // base64 编码的加密数据
  passwordHash?: string;  // base64 编码，可选（存在时 Password 可登录）
}

/**
 * RecoveryCode 凭证数据
 */
export interface IRecoveryCredential {
  recoverySeed: string;  // base64 编码
  masterKeySecret: string;  // base64 编码的加密数据
}

/**
 * credentials.json 数据结构
 */
export interface ICredentialsData {
  version: number;
  createdAt: number;
  updatedAt: number;
  passkeys: IPasskeyCredential[];
  recovery: IRecoveryCredential;
  password?: IPasswordCredential;
}

/**
 * 系统状态
 */
export interface ISystemStatus {
  initialized: boolean;
  passkeysExist: boolean;
  passwordLoginAvailable: boolean;
  hasPassword: boolean;
}

// credentials.json 路径
const CredentialsPath = join(homedir(), '.keyroll', 'credentials.json');

/**
 * Credentials 管理器
 * 单例模式，管理 credentials.json 的读写
 */
export class CredentialsManager {
  private static instance: CredentialsManager | null = null;
  private credentials: ICredentialsData | null = null;
  private masterKey: Buffer | null = null;  // 解密后的 MasterKey（内存中）

  private constructor() {}

  static getInstance(): CredentialsManager {
    if (!CredentialsManager.instance) {
      CredentialsManager.instance = new CredentialsManager();
    }
    return CredentialsManager.instance;
  }

  /**
   * 获取 credentials.json 路径
   */
  getCredentialsPath(): string {
    return CredentialsPath;
  }

  /**
   * 检查系统是否已初始化
   */
  isInitialized(): boolean {
    return this.credentials !== null;
  }

  /**
   * 获取系统状态
   */
  getSystemStatus(): ISystemStatus {
    if (!this.credentials) {
      return {
        initialized: false,
        passkeysExist: false,
        passwordLoginAvailable: false,
        hasPassword: false
      };
    }

    const passkeysExist = this.credentials.passkeys.length > 0;
    const hasPassword = !!this.credentials.password;
    // Password 登录可用：有 passwordHash 且无 Passkey
    const passwordLoginAvailable = hasPassword && !passkeysExist;

    return {
      initialized: true,
      passkeysExist,
      passwordLoginAvailable,
      hasPassword
    };
  }

  /**
   * 加载 credentials.json
   * @returns true 如果加载成功，false 如果文件不存在或无效
   */
  load(): boolean {
    try {
      if (!existsSync(CredentialsPath)) {
        return false;
      }

      const data = readFileSync(CredentialsPath, 'utf-8');
      const parsed = JSON.parse(data) as ICredentialsData;

      // 验证必需字段
      if (!parsed.version || !parsed.createdAt || !parsed.recovery || !parsed.passkeys) {
        return false;
      }

      this.credentials = parsed;
      return true;
    } catch (err) {
      console.error('Failed to load credentials:', err);
      return false;
    }
  }

  /**
   * 初始化系统（首次配置）
   * @param password - 可选，6 位数字密码
   * @returns recoveryCode（仅首次返回）
   */
  initialize(password?: string): string {
    if (this.credentials) {
      throw new Error('System already initialized');
    }

    const now = Date.now();
    const recoveryCode = generateRecoveryCode();
    const recoverySeed = generateRecoverySeed();
    const masterKey = generateMasterKey();

    // 使用 RecoveryCode 加密 MasterKey
    const recoveryKey = deriveKey(recoveryCode, recoverySeed);
    const recoveryMasterKeySecret = encryptMasterKey(masterKey, recoveryKey);

    const credentials: ICredentialsData = {
      version: 1,
      createdAt: now,
      updatedAt: now,
      passkeys: [],
      recovery: {
        recoverySeed: recoverySeed.toString('base64'),
        masterKeySecret: recoveryMasterKeySecret
      }
    };

    // 如果提供了 Password，设置 Password 凭证
    if (password) {
      if (!isValidPassword(password)) {
        throw new Error('Invalid password format');
      }

      const passwordSalt = generateSalt();
      const passwordKey = deriveKey(password, passwordSalt);
      const passwordMasterKeySecret = encryptMasterKey(masterKey, passwordKey);
      const passwordHash = computePasswordHash(password, passwordSalt);

      credentials.password = {
        passwordSalt: passwordSalt.toString('base64'),
        masterKeySecret: passwordMasterKeySecret,
        passwordHash
      };
    }

    // 保存 credentials
    this.credentials = credentials;
    this.masterKey = masterKey;
    this.save();

    return recoveryCode;
  }

  /**
   * 保存 credentials.json
   */
  private save(): void {
    if (!this.credentials) {
      throw new Error('No credentials to save');
    }

    this.credentials.updatedAt = Date.now();
    const data = JSON.stringify(this.credentials, null, 2);
    writeFileSync(CredentialsPath, data, 'utf-8');
  }

  /**
   * 验证 RecoveryCode 并解密 MasterKey
   * @param recoveryCode - 用户输入的 RecoveryCode
   * @returns true 如果验证成功
   */
  verifyRecoveryCode(recoveryCode: string): boolean {
    if (!this.credentials) {
      throw new Error('System not initialized');
    }

    try {
      const recoverySeed = Buffer.from(this.credentials.recovery.recoverySeed, 'base64');
      const recoveryKey = deriveKey(recoveryCode, recoverySeed);
      const masterKey = decryptMasterKey(this.credentials.recovery.masterKeySecret, recoveryKey);

      this.masterKey = masterKey;

      // RecoveryCode 验证成功后，清理 passwordHash
      if (this.credentials.password) {
        delete this.credentials.password.passwordHash;
        this.save();
      }

      return true;
    } catch {
      return false;
    }
  }

  /**
   * 验证 Password 并解密 MasterKey
   * @param password - 用户输入的 Password
   * @returns true 如果验证成功
   */
  verifyPassword(password: string): boolean {
    if (!this.credentials?.password) {
      return false;
    }

    try {
      const passwordSalt = Buffer.from(this.credentials.password.passwordSalt, 'base64');
      const passwordKey = deriveKey(password, passwordSalt);
      const masterKey = decryptMasterKey(this.credentials.password.masterKeySecret, passwordKey);

      this.masterKey = masterKey;

      return true;
    } catch {
      return false;
    }
  }

  /**
   * 验证 Password 登录（仅当无 Passkey 时）
   * @param password - 用户输入的 Password
   * @returns true 如果验证成功
   */
  verifyPasswordForLogin(password: string): boolean {
    if (!this.credentials?.password?.passwordHash) {
      return false;
    }

    const passwordSalt = Buffer.from(this.credentials.password.passwordSalt, 'base64');
    return computePasswordHash(password, passwordSalt) === this.credentials.password.passwordHash;
  }

  /**
   * 设置/更新 Password
   * @param password - 新的 Password（6 位数字）
   * @returns true 如果设置成功
   */
  setPassword(password: string): boolean {
    if (!this.credentials) {
      throw new Error('System not initialized');
    }

    if (!isValidPassword(password)) {
      throw new Error('Invalid password format');
    }

    // 如果 MasterKey 尚未加载，需要先验证现有 Password 或 RecoveryCode
    if (!this.masterKey) {
      throw new Error('MasterKey not loaded');
    }

    const passwordSalt = generateSalt();
    const passwordKey = deriveKey(password, passwordSalt);
    const passwordMasterKeySecret = encryptMasterKey(this.masterKey, passwordKey);
    const passwordHash = computePasswordHash(password, passwordSalt);

    this.credentials.password = {
      passwordSalt: passwordSalt.toString('base64'),
      masterKeySecret: passwordMasterKeySecret,
      passwordHash
    };

    this.save();
    return true;
  }

  /**
   * 更新 Password（RecoveryCode 恢复后）
   * @param password - 新的 Password（6 位数字）
   * @returns true 如果更新成功
   */
  updatePasswordAfterRecovery(password: string): boolean {
    if (!this.credentials) {
      throw new Error('System not initialized');
    }

    if (!this.masterKey) {
      throw new Error('MasterKey not loaded');
    }

    if (!isValidPassword(password)) {
      throw new Error('Invalid password format');
    }

    const passwordSalt = generateSalt();
    const passwordKey = deriveKey(password, passwordSalt);
    const passwordMasterKeySecret = encryptMasterKey(this.masterKey, passwordKey);
    const passwordHash = computePasswordHash(password, passwordSalt);

    this.credentials.password = {
      passwordSalt: passwordSalt.toString('base64'),
      masterKeySecret: passwordMasterKeySecret,
      passwordHash
    };

    this.save();
    return true;
  }

  /**
   * 获取 MasterKey（用于数据加密/解密）
   * @returns MasterKey Buffer
   * @throws Error 如果 MasterKey 尚未加载
   */
  getMasterKey(): Buffer {
    if (!this.masterKey) {
      throw new Error('MasterKey not loaded. Please authenticate first.');
    }
    return this.masterKey;
  }

  /**
   * 检查 MasterKey 是否已加载
   */
  isMasterKeyLoaded(): boolean {
    return this.masterKey !== null;
  }

  /**
   * 添加 Passkey
   */
  addPasskey(credential: IPasskeyCredential): void {
    if (!this.credentials) {
      throw new Error('System not initialized');
    }

    this.credentials.passkeys.push(credential);
    this.save();
  }

  /**
   * 移除 Passkey
   */
  removePasskey(credentialId: string): boolean {
    if (!this.credentials) {
      throw new Error('System not initialized');
    }

    const index = this.credentials.passkeys.findIndex(pk => pk.credentialId === credentialId);
    if (index === -1) {
      return false;
    }

    this.credentials.passkeys.splice(index, 1);
    this.save();
    return true;
  }

  /**
   * 获取所有 Passkey
   */
  getPasskeys(): IPasskeyCredential[] {
    return this.credentials?.passkeys || [];
  }

  /**
   * 获取 Passkey 公钥
   */
  getPasskeyPublicKey(credentialId: string): string | null {
    const passkey = this.credentials?.passkeys.find(pk => pk.credentialId === credentialId);
    return passkey?.publicKey || null;
  }

  /**
   * 获取 Passkey counter
   */
  getPasskeyCounter(credentialId: string): number {
    const passkey = this.credentials?.passkeys.find(pk => pk.credentialId === credentialId);
    return passkey?.counter || 0;
  }

  /**
   * 更新 Passkey counter
   */
  updatePasskeyCounter(credentialId: string, counter: number): void {
    if (!this.credentials) {
      throw new Error('System not initialized');
    }

    const passkey = this.credentials.passkeys.find(pk => pk.credentialId === credentialId);
    if (passkey) {
      passkey.counter = counter;
      this.save();
    }
  }

  /**
   * 检查 Password 登录是否可用
   */
  isPasswordLoginAvailable(): boolean {
    const status = this.getSystemStatus();
    return status.passwordLoginAvailable;
  }
}

export default CredentialsManager;
