import { FastifyPluginCallback } from 'fastify';

import Database from '../services/database.js';
import type { IRecord, ERecordType } from '../../shared/types.js';

interface IRecordsQuery {
  prefix?: string;
  domain?: string;
  type?: string;
  secureLevel?: string;
}

export const registerApiRoutes: FastifyPluginCallback = async (fastify) => {
  // Health check
  fastify.get('/health', async () => {
    return { status: 'ok' };
  });

  /**
   * POST /model/records/search
   * 搜索记录（支持 prefix 过滤）
   */
  fastify.post<{ Body: IRecordsQuery; }>('/model/records/search', async (request) => {
    const store = Database.getInstance();
    const body = request.body;

    const options = {
      prefix: body.prefix,
      domain: body.domain,
      type: body.type as ERecordType | undefined,
      secureLevel: body.secureLevel ? parseInt(body.secureLevel, 10) : undefined
    };

    const items = store.getRecords(options);
    return { content: { items } };
  });

  /**
   * POST /model/records/detail
   * 获取单条记录
   */
  fastify.post<{ Body: { recordKey: string; }; }>('/model/records/detail', async (request, reply) => {
    const store = Database.getInstance();
    const { recordKey } = request.body;

    const record = store.getRecord(recordKey);
    if (!record) {
      reply.code(404);
      return { error: 'Record not found' };
    }
    return { content: { record } };
  });

  /**
   * POST /model/records/create
   * 创建记录
   */
  fastify.post<{ Body: { recordKey: string; recordType: string; recordValue: string; contentType: string; secureLevel?: number; }; }>('/model/records/create', async (request, reply) => {
    const store = Database.getInstance();
    const body = request.body;

    if (!body.recordKey || !body.recordType || !body.recordValue || !body.contentType) {
      reply.code(400);
      return { error: 'Missing required fields: recordKey, recordType, recordValue, contentType' };
    }

    if (!['plain', 'refer', 'graph'].includes(body.recordType)) {
      reply.code(400);
      return { error: 'Invalid recordType. Must be "plain", "refer" or "graph"' };
    }

    const validPrefixes: Record<string, string[]> = {
      plain: ['/plain/', '/inner/'],
      refer: ['/refer/'],
      graph: ['/graph/']
    };
    const allowed = validPrefixes[body.recordType] || [];
    if (!allowed.some(p => body.recordKey.startsWith(p))) {
      reply.code(400);
      return { error: `Invalid key format. Must start with ${allowed.join(' or ')}` };
    }

    const record = {
      recordKey: body.recordKey,
      recordType: body.recordType as ERecordType,
      recordValue: body.recordValue,
      contentType: body.contentType,
      secureLevel: body.secureLevel ?? 0,
      createdAt: Date.now() / 1000,
      updatedAt: Date.now() / 1000
    } satisfies IRecord;

    store.upsertRecord(record);
    return { success: true };
  });

  /**
   * POST /model/records/update
   * 更新记录
   */
  fastify.post<{ Body: { recordKey: string; recordType?: string; recordValue?: string; contentType?: string; secureLevel?: number; }; }>('/model/records/update', async (request, reply) => {
    const store = Database.getInstance();
    const body = request.body;

    const existing = store.getRecord(body.recordKey);
    if (!existing) {
      reply.code(404);
      return { error: 'Record not found' };
    }

    const updated = {
      recordKey: existing.recordKey,
      recordType: (body.recordType || existing.recordType) as ERecordType,
      recordValue: body.recordValue ?? existing.recordValue,
      contentType: body.contentType ?? existing.contentType,
      secureLevel: body.secureLevel ?? existing.secureLevel,
      createdAt: existing.createdAt,
      updatedAt: Date.now() / 1000
    } satisfies IRecord;

    store.upsertRecord(updated);
    return { success: true };
  });

  /**
   * POST /model/records/delete
   * 软删除记录
   */
  fastify.post<{ Body: { recordKey: string; }; }>('/model/records/delete', async (request, reply) => {
    const store = Database.getInstance();
    const { recordKey } = request.body;

    const record = store.getRecord(recordKey);
    if (!record) {
      reply.code(404);
      return { error: 'Record not found' };
    }

    store.deleteRecord(recordKey);
    return { success: true };
  });
};
