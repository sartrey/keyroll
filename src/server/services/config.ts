import { join } from 'node:path';
import { homedir } from 'node:os';
import { mkdirSync, existsSync } from 'node:fs';

/**
 * 用户数据目录：~/.keyroll
 */
export const UserDataDir = join(homedir(), '.keyroll');

/**
 * 初始化用户数据目录
 */
export function ensureUserDataDir(): void {
  if (!existsSync(UserDataDir)) {
    mkdirSync(UserDataDir, { recursive: true });
  }
}

/**
 * 检查用户数据目录是否已初始化
 */
export function isUserDataDirInitialized(): boolean {
  return existsSync(UserDataDir);
}
