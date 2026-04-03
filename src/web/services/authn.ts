import { fetcher } from './fetcher';

export interface IAuthStatus {
  initialized: boolean;
}

export interface ILoginResponse {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
}

/**
 * 获取系统认证状态
 */
export async function getAuthStatus(): Promise<IAuthStatus> {
  const result = await fetcher<{ content: IAuthStatus; }>('/authn/status');
  return result.content;
}

/**
 * 初始化系统（设置 Password）
 */
export async function initializeSystem(password: string): Promise<{ content: { recoveryCode: string; }; }> {
  return fetcher('/authn/password/create', {
    method: 'POST',
    body: JSON.stringify({ password })
  });
}

/**
 * Password 登录
 */
export async function passwordLogin(password: string): Promise<{ content: ILoginResponse; }> {
  return fetcher('/authn/password/verify', {
    method: 'POST',
    body: JSON.stringify({ password })
  });
}

/**
 * RecoveryCode 验证
 */
export async function recoveryVerify(recoveryCode: string): Promise<{ content: { message: string; nextStep: string; }; }> {
  return fetcher('/authn/recovery/verify', {
    method: 'POST',
    body: JSON.stringify({ recoveryCode })
  });
}

/**
 * 设置/更新 Password（恢复后重设或已登录更新）
 */
export async function passwordUpdate(password: string): Promise<{ content: { message?: string; }; }> {
  return fetcher('/authn/password/update', {
    method: 'POST',
    body: JSON.stringify({ password })
  });
}

/**
 * 登出
 */
export async function logout(accessToken: string): Promise<void> {
  await fetcher('/authn/sessions/delete', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}

/**
 * 保存 Access Token 到本地存储
 */
export function saveAccessToken(token: string): void {
  localStorage.setItem('keyroll_access_token', token);
}

/**
 * 获取保存的 Access Token
 */
export function getAccessToken(): string | null {
  return localStorage.getItem('keyroll_access_token');
}

/**
 * 清除保存的 Access Token
 */
export function clearAccessToken(): void {
  localStorage.removeItem('keyroll_access_token');
}
