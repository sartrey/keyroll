import Database from './database.js';
import {
  generateMasterKey,
  generateRecoveryCode,
  generateRecoverySeed,
  generateSalt,
  deriveKey,
  encryptMasterKey,
  decryptMasterKey,
  isValidPassword
} from './crypto.js';

/**
 * Password 凭证数据
 */
export interface IPasswordCredential {
  passwordSalt: string;  // base64 编码
  masterKeySecret: string;  // base64 编码的加密数据
}

/**
 * RecoveryCode 凭证数据
 */
export interface IRecoveryCredential {
  recoverySeed: string;  // base64 编码
  masterKeySecret: string;  // base64 编码的加密数据
}

/**
 * 系统状态
 */
export interface ISystemStatus {
  initialized: boolean;
}

/**
 * Credentials 管理器
 * 单例模式，管理 keyroll.db inner 记录的读写
 */
export class CredentialsManager {
  private static instance: CredentialsManager | null = null;
  private passwordCred: IPasswordCredential | null = null;
  private recoveryCred: IRecoveryCredential | null = null;
  private masterKey: Buffer | null = null;  // 解密后的 MasterKey（内存中）

  private constructor() {}

  static getInstance(): CredentialsManager {
    if (!CredentialsManager.instance) {
      CredentialsManager.instance = new CredentialsManager();
    }
    return CredentialsManager.instance;
  }

  /**
   * 检查系统是否已初始化
   */
  isInitialized(): boolean {
    return this.passwordCred !== null;
  }

  /**
   * 获取系统状态
   */
  getSystemStatus(): ISystemStatus {
    return { initialized: this.isInitialized() };
  }

  /**
   * 从数据库加载 inner 凭证记录
   * @returns true 如果加载成功，false 如果未初始化
   */
  load(): boolean {
    try {
      const db = Database.getInstance();

      const passwordRecord = db.getInnerRecord('/inner/system.authn/password');
      if (passwordRecord) {
        this.passwordCred = JSON.parse(passwordRecord.recordValue) as IPasswordCredential;
      }

      const recoveryRecord = db.getInnerRecord('/inner/system.authn/recovery');
      if (recoveryRecord) {
        this.recoveryCred = JSON.parse(recoveryRecord.recordValue) as IRecoveryCredential;
      }

      return this.passwordCred !== null;
    } catch (err) {
      console.error('Failed to load credentials from database:', err);
      return false;
    }
  }

  /**
   * 初始化系统（首次配置）
   * @param password - 可选，6-16 位数字密码
   * @returns recoveryCode（仅首次返回）
   */
  initialize(password?: string): string {
    if (this.isInitialized()) {
      throw new Error('System already initialized');
    }

    const recoveryCode = generateRecoveryCode();
    const recoverySeed = generateRecoverySeed();
    const masterKey = generateMasterKey();

    // 使用 RecoveryCode 加密 MasterKey
    const recoveryKey = deriveKey(recoveryCode, recoverySeed);
    const recoveryMasterKeySecret = encryptMasterKey(masterKey, recoveryKey);

    // 保存 Recovery 凭证
    const recoveryRecord = {
      recordKey: '/inner/system.authn/recovery',
      recordType: 'inner' as const,
      contentType: 'application/json',
      secureLevel: 0,
      createdAt: 0,
      updatedAt: 0,
      recordValue: JSON.stringify({
        recoverySeed: recoverySeed.toString('base64'),
        masterKeySecret: recoveryMasterKeySecret
      })
    };

    if (password) {
      if (!isValidPassword(password)) {
        throw new Error('Invalid password format');
      }

      const passwordSalt = generateSalt();
      const passwordKey = deriveKey(password, passwordSalt);
      const passwordMasterKeySecret = encryptMasterKey(masterKey, passwordKey);

      // 保存 Password 凭证
      this.passwordCred = {
        passwordSalt: passwordSalt.toString('base64'),
        masterKeySecret: passwordMasterKeySecret
      };
    }

    // 保存 Recovery 凭证
    this.recoveryCred = {
      recoverySeed: recoverySeed.toString('base64'),
      masterKeySecret: recoveryMasterKeySecret
    };
    this.masterKey = masterKey;

    // 写入数据库
    const db = Database.getInstance();

    if (this.passwordCred) {
      db.upsertInnerRecord({
        recordKey: '/inner/system.authn/password',
        recordType: 'inner',
        contentType: 'application/json',
        secureLevel: 0,
        createdAt: 0,
        updatedAt: 0,
        recordValue: JSON.stringify(this.passwordCred)
      });
    }

    db.upsertInnerRecord(recoveryRecord);

    return recoveryCode;
  }

  /**
   * 验证 RecoveryCode 并解密 MasterKey
   * @param recoveryCode - 用户输入的 RecoveryCode
   * @returns true 如果验证成功
   */
  verifyRecoveryCode(recoveryCode: string): boolean {
    if (!this.recoveryCred) {
      throw new Error('System not initialized');
    }

    try {
      const recoverySeed = Buffer.from(this.recoveryCred.recoverySeed, 'base64');
      const recoveryKey = deriveKey(recoveryCode, recoverySeed);
      const masterKey = decryptMasterKey(this.recoveryCred.masterKeySecret, recoveryKey);

      this.masterKey = masterKey;

      // RecoveryCode 验证成功后，清理 password 数据（需要用户重设）
      const db = Database.getInstance();
      db.deleteRecord('/inner/system.authn/password');
      this.passwordCred = null;

      return true;
    } catch {
      return false;
    }
  }

  /**
   * 验证 Password 并解密 MasterKey（登录）
   * @param password - 用户输入的 Password
   * @returns true 如果验证成功
   */
  verifyPasswordForLogin(password: string): boolean {
    if (!this.passwordCred) {
      return false;
    }

    try {
      const passwordSalt = Buffer.from(this.passwordCred.passwordSalt, 'base64');
      const passwordKey = deriveKey(password, passwordSalt);
      const masterKey = decryptMasterKey(this.passwordCred.masterKeySecret, passwordKey);

      this.masterKey = masterKey;
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 设置/更新 Password（已登录状态，有 MasterKey 或需要现有密码验证）
   * @param password - 新的 Password（6-16 位数字）
   * @param currentPassword - 可选，现有密码（用于普通更新时验证身份）
   * @returns true 如果设置成功
   */
  setPassword(password: string, currentPassword?: string): boolean {
    if (!this.isInitialized() && !this.masterKey) {
      // 未初始化且无 MasterKey，不应走到这里（应该调用 initialize）
      throw new Error('System not initialized');
    }

    if (!isValidPassword(password)) {
      throw new Error('Invalid password format');
    }

    // 如果 MasterKey 未加载，需要 currentPassword 来解密
    if (!this.masterKey) {
      if (!currentPassword || !this.passwordCred) {
        throw new Error('MasterKey not loaded');
      }
      try {
        const salt = Buffer.from(this.passwordCred.passwordSalt, 'base64');
        const key = deriveKey(currentPassword, salt);
        this.masterKey = decryptMasterKey(this.passwordCred.masterKeySecret, key);
      } catch {
        throw new Error('Current password verification failed');
      }
    }

    if (!this.masterKey) {
      throw new Error('MasterKey not loaded');
    }

    const passwordSalt = generateSalt();
    const passwordKey = deriveKey(password, passwordSalt);
    const passwordMasterKeySecret = encryptMasterKey(this.masterKey, passwordKey);

    this.passwordCred = {
      passwordSalt: passwordSalt.toString('base64'),
      masterKeySecret: passwordMasterKeySecret
    };

    const db = Database.getInstance();
    db.upsertInnerRecord({
      recordKey: '/inner/system.authn/password',
      recordType: 'inner',
      contentType: 'application/json',
      secureLevel: 0,
      createdAt: 0,
      updatedAt: 0,
      recordValue: JSON.stringify(this.passwordCred)
    });

    return true;
  }

  /**
   * 更新 Password（RecoveryCode 恢复后，MasterKey 已加载）
   * @param password - 新的 Password（6-16 位数字）
   * @returns true 如果更新成功
   */
  updatePasswordAfterRecovery(password: string): boolean {
    if (!this.masterKey) {
      throw new Error('MasterKey not loaded');
    }

    if (!isValidPassword(password)) {
      throw new Error('Invalid password format');
    }

    const passwordSalt = generateSalt();
    const passwordKey = deriveKey(password, passwordSalt);
    const passwordMasterKeySecret = encryptMasterKey(this.masterKey, passwordKey);

    this.passwordCred = {
      passwordSalt: passwordSalt.toString('base64'),
      masterKeySecret: passwordMasterKeySecret
    };

    const db = Database.getInstance();
    db.upsertInnerRecord({
      recordKey: '/inner/system.authn/password',
      recordType: 'inner',
      contentType: 'application/json',
      secureLevel: 0,
      createdAt: 0,
      updatedAt: 0,
      recordValue: JSON.stringify(this.passwordCred)
    });

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
}

export default CredentialsManager;
