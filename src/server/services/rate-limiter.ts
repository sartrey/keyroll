/**
 * 速率限制器
 * 用于 Password 和 RecoveryCode 尝试次数限制
 */

interface IRateLimitEntry {
  count: number;
  firstAttempt: number;
  lastAttempt: number;
}

export class RateLimiter {
  // 存储 key 的尝试记录：key -> { count, firstAttempt, lastAttempt }
  private attempts: Map<string, IRateLimitEntry> = new Map();

  /**
   * 检查是否超过速率限制
   * @param key - 标识符（如 IP 地址或用户 ID）
   * @param maxAttempts - 最大尝试次数
   * @param windowMs - 时间窗口（毫秒）
   * @returns true 如果未超过限制，可以进行尝试
   */
  checkLimit(key: string, maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000): boolean {
    const now = Date.now();
    const entry = this.attempts.get(key);

    if (!entry) {
      return true;
    }

    // 检查是否超过时间窗口
    if (now - entry.firstAttempt > windowMs) {
      // 重置计数
      this.attempts.delete(key);
      return true;
    }

    // 检查是否超过尝试次数
    return entry.count < maxAttempts;
  }

  /**
   * 记录一次尝试
   * @param key - 标识符
   */
  recordAttempt(key: string): void {
    const now = Date.now();
    const entry = this.attempts.get(key);

    if (!entry) {
      this.attempts.set(key, {
        count: 1,
        firstAttempt: now,
        lastAttempt: now
      });
    } else {
      entry.count++;
      entry.lastAttempt = now;
    }
  }

  /**
   * 重置指定 key 的计数
   */
  reset(key: string): void {
    this.attempts.delete(key);
  }

  /**
   * 清理过期的记录（定期调用）
   */
  cleanup(windowMs: number = 15 * 60 * 1000): void {
    const now = Date.now();
    for (const [key, entry] of this.attempts.entries()) {
      if (now - entry.firstAttempt > windowMs) {
        this.attempts.delete(key);
      }
    }
  }

  /**
   * 获取剩余尝试次数
   */
  getRemainingAttempts(key: string, maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000): number {
    const now = Date.now();
    const entry = this.attempts.get(key);

    if (!entry || now - entry.firstAttempt > windowMs) {
      return maxAttempts;
    }

    return Math.max(0, maxAttempts - entry.count);
  }
}

// 单例实例
let rateLimiterInstance: RateLimiter | null = null;

export default class RateLimiterSingleton {
  static getInstance(): RateLimiter {
    if (!rateLimiterInstance) {
      rateLimiterInstance = new RateLimiter();
    }
    return rateLimiterInstance;
  }
}
