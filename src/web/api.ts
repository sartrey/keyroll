export const API_BASE = '/api';

export async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

export interface IRecord {
  recordKey: string;
  recordType: 'plain' | 'refer';
  recordValue: string;
  contentType: string;
  secureLevel: number;
  createdAt: number;
  updatedAt: number;
}

export const api = {
  records: {
    list: (params?: { prefix?: string; domain?: string; type?: string; secureLevel?: number }) => {
      const search = new URLSearchParams();
      if (params?.prefix) search.set('prefix', params.prefix);
      if (params?.domain) search.set('domain', params.domain);
      if (params?.type) search.set('type', params.type);
      if (params?.secureLevel !== undefined) search.set('secureLevel', String(params.secureLevel));
      const query = search.toString();
      return fetchAPI<IRecord[]>(`/records${query ? `?${query}` : ''}`);
    },
    get: (recordKey: string) => {
      // URL 编码 recordKey（因为包含 / 字符）
      const encodedKey = encodeURIComponent(recordKey.slice(1)); // 去掉开头的 /
      return fetchAPI<IRecord>(`/records/${encodedKey}`);
    },
    put: (recordKey: string, body: { recordType: 'plain' | 'refer'; recordValue: string; contentType: string; secureLevel?: number }) => {
      const encodedKey = encodeURIComponent(recordKey.slice(1));
      return fetchAPI<{ success: boolean }>(`/records/${encodedKey}`, {
        method: 'PUT',
        body: JSON.stringify(body),
      });
    },
    delete: (recordKey: string) => {
      const encodedKey = encodeURIComponent(recordKey.slice(1));
      return fetchAPI<{ success: boolean }>(`/records/${encodedKey}`, {
        method: 'DELETE',
      });
    },
  },
};
