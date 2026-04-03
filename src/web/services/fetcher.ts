import { message } from 'antd';

export const ApiBase = '/api';

/**
 * 获取保存的 Access Token
 */
function getAccessToken(): string | null {
  return localStorage.getItem('keyroll_access_token');
}

export async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = getAccessToken();

  const response = await fetch(`${ApiBase}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...token ? { Authorization: `Bearer ${token}` } : {},
      ...options?.headers
    }
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const detail = body?.error ?? body?.errorId ?? body?.message ?? `Request failed: ${response.status}`;
    message.error(detail, 5);
    const err = new Error(detail);
    (err as any)._apiError = true;
    throw err;
  }

  return response.json();
}
