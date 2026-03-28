import { randomUUID } from 'node:crypto';

/**
 * 会话数据
 */
interface ISessionData {
  accessToken: string;
  createdAt: number;
  lastActivity: number;
  expiresAt: number;
}

/**
 * 会话管理器
 * 管理内存中的 AccessToken 会话
 */
export class SessionManager {
  private static instance: SessionManager | null = null;
  private sessions: Map<string, ISessionData> = new Map();

  // 会话过期时间（30 分钟）
  private readonly sessionTimeoutMs: number = 30 * 60 * 1000;

  private constructor() {
    // 定期清理过期会话（每 5 分钟）
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  /**
   * 创建新会话
   * @returns accessToken
   */
  createSession(): string {
    const now = Date.now();
    const accessToken = randomUUID();

    this.sessions.set(accessToken, {
      accessToken,
      createdAt: now,
      lastActivity: now,
      expiresAt: now + this.sessionTimeoutMs
    });

    return accessToken;
  }

  /**
   * 验证会话
   * @param accessToken - 要验证的 Token
   * @returns true 如果会话有效
   */
  validateSession(accessToken: string): boolean {
    const session = this.sessions.get(accessToken);

    if (!session) {
      return false;
    }

    const now = Date.now();

    // 检查是否过期
    if (now > session.expiresAt) {
      this.sessions.delete(accessToken);
      return false;
    }

    // 更新最后活动时间
    session.lastActivity = now;
    session.expiresAt = now + this.sessionTimeoutMs;

    return true;
  }

  /**
   * 删除会话（登出）
   * @param accessToken - 要删除的 Token
   * @returns true 如果删除成功
   */
  deleteSession(accessToken: string): boolean {
    return this.sessions.delete(accessToken);
  }

  /**
   * 获取会话信息
   */
  getSession(accessToken: string): ISessionData | null {
    return this.sessions.get(accessToken) || null;
  }

  /**
   * 清理过期会话
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [token, session] of this.sessions.entries()) {
      if (now > session.expiresAt) {
        this.sessions.delete(token);
      }
    }
  }

  /**
   * 获取活跃会话数量
   */
  getActiveSessionCount(): number {
    this.cleanup();
    return this.sessions.size;
  }
}

export default SessionManager;
