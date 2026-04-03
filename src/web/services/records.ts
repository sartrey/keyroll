import type { IRecord } from '../../shared/types';

import { fetcher } from './fetcher';

interface ListResult {
  content: { items: IRecord[]; };
}

/**
 * 获取记录列表（支持过滤）
 */
export async function listRecords(params?: {
  prefix?: string;
  domain?: string;
  type?: string;
  secureLevel?: number;
}): Promise<IRecord[]> {
  const result = await fetcher<ListResult>('/model/records/search', {
    method: 'POST',
    body: JSON.stringify(params ?? {})
  });
  return result.content?.items ?? [];
}

/**
 * 获取单条记录
 */
export async function getRecord(recordKey: string): Promise<IRecord> {
  const result = await fetcher<{ content: { record: IRecord; }; }>('/model/records/detail', {
    method: 'POST',
    body: JSON.stringify({ recordKey })
  });
  return result.content.record;
}

/**
 * 创建记录
 */
export async function createRecord(
    recordKey: string,
    body: {
      recordType: IRecord['recordType'];
      recordValue: string;
      contentType: string;
      secureLevel?: number;
    }
): Promise<void> {
  await fetcher('/model/records/create', {
    method: 'POST',
    body: JSON.stringify({ recordKey, ...body })
  });
}

/**
 * 更新记录
 */
export async function updateRecord(
    recordKey: string,
    updates: {
      recordType?: IRecord['recordType'];
      recordValue?: string;
      contentType?: string;
      secureLevel?: number;
    }
): Promise<void> {
  await fetcher('/model/records/update', {
    method: 'POST',
    body: JSON.stringify({ recordKey, ...updates })
  });
}

/**
 * 软删除记录
 */
export async function deleteRecord(recordKey: string): Promise<void> {
  await fetcher('/model/records/delete', {
    method: 'POST',
    body: JSON.stringify({ recordKey })
  });
}
