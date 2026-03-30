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
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ errorId: 'UnknownError' }));
    throw new Error(`API Error: ${response.status} - ${error.errorId || 'Unknown'}`);
  }

  return response.json();
}
