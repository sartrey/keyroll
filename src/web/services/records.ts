import type { IRecord } from '../../shared/types';

import { fetcher } from './fetcher';

/**
 * 获取记录列表（支持过滤）
 */
export async function listRecords(params?: {
  prefix?: string;
  domain?: string;
  type?: string;
  secureLevel?: number;
}): Promise<IRecord[]> {
  const search = new URLSearchParams();
  if (params?.prefix) { search.set('prefix', params.prefix); }
  if (params?.domain) { search.set('domain', params.domain); }
  if (params?.type) { search.set('type', params.type); }
  if (params?.secureLevel !== undefined) { search.set('secureLevel', String(params.secureLevel)); }
  const query = search.toString();
  return fetcher(`/records${query ? `?${query}` : ''}`);
}

/**
 * 获取单条记录
 */
export async function getRecord(recordKey: string): Promise<IRecord> {
  const encodedKey = encodeURIComponent(recordKey.slice(1));
  return fetcher(`/records/${encodedKey}`);
}

/**
 * 创建或更新记录
 */
export async function putRecord(
    recordKey: string,
    body: {
      recordType: 'plain' | 'refer';
      recordValue: string;
      contentType: string;
      secureLevel?: number;
    }
): Promise<{ success: boolean; }> {
  const encodedKey = encodeURIComponent(recordKey.slice(1));
  return fetcher(`/records/${encodedKey}`, {
    method: 'PUT',
    body: JSON.stringify(body)
  });
}

/**
 * 软删除记录
 */
export async function deleteRecord(recordKey: string): Promise<{ success: boolean; }> {
  const encodedKey = encodeURIComponent(recordKey.slice(1));
  return fetcher(`/records/${encodedKey}`, {
    method: 'DELETE'
  });
}
