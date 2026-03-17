import { FastifyPluginCallback } from 'fastify';
import Database from '../db/Database.js';
import type { IRecord as KeyrollRecord, ERecordType } from '../../shared/types.js';

export const registerApiRoutes: FastifyPluginCallback = async (fastify) => {
  // Health check
  fastify.get('/health', async () => {
    return { status: 'ok' };
  });

  /**
   * GET /records
   * 获取记录列表（支持过滤）
   * 查询参数：prefix, domain, type, secureLevel
   */
  fastify.get('/records', async (request) => {
    const store = Database.getInstance();
    const query = request.query as Record<string, string | undefined>;

    const options = {
      prefix: query.prefix,
      domain: query.domain,
      type: query.type as ERecordType | undefined,
      secureLevel: query.secureLevel ? parseInt(query.secureLevel, 10) : undefined,
    };

    return store.getRecords(options);
  });

  /**
   * GET /records/:key
   * 获取单条记录（key 需要 URL 编码）
   * 使用正则匹配剩余所有路径
   */
  fastify.get('/records/:key(.*)', async (request, reply) => {
    const store = Database.getInstance();
    const rawKey = (request.params as { key: string }).key;
    const recordKey = '/' + decodeURIComponent(rawKey);

    const record = store.getRecord(recordKey);
    if (!record) {
      reply.code(404);
      return { error: 'Record not found' };
    }
    return record;
  });

  /**
   * PUT /records/:key
   * 创建或更新记录
   */
  fastify.put('/records/:key(.*)', async (request, reply) => {
    const store = Database.getInstance();
    const rawKey = (request.params as { key: string }).key;
    const recordKey = '/' + decodeURIComponent(rawKey);

    const body = request.body as {
      recordType: ERecordType;
      recordValue: string;
      contentType: string;
      secureLevel?: number;
    };

    // 验证必填字段
    if (!body.recordType || !body.recordValue || !body.contentType) {
      reply.code(400);
      return { error: 'Missing required fields: recordType, recordValue, contentType' };
    }

    // 验证 recordType
    if (!['plain', 'refer'].includes(body.recordType)) {
      reply.code(400);
      return { error: 'Invalid recordType. Must be "plain" or "refer"' };
    }

    // 验证 key 格式
    if (!recordKey.startsWith('/plain/') && !recordKey.startsWith('/refer/')) {
      reply.code(400);
      return { error: 'Invalid key format. Must start with /plain/ or /refer/' };
    }

    const record: KeyrollRecord = {
      recordKey,
      recordType: body.recordType,
      recordValue: body.recordValue,
      contentType: body.contentType,
      secureLevel: body.secureLevel ?? 0,
      createdAt: Date.now() / 1000,
      updatedAt: Date.now() / 1000,
    };

    store.upsertRecord(record);
    return { success: true };
  });

  /**
   * DELETE /records/:key
   * 软删除记录
   */
  fastify.delete('/records/:key(.*)', async (request, reply) => {
    const store = Database.getInstance();
    const rawKey = (request.params as { key: string }).key;
    const recordKey = '/' + decodeURIComponent(rawKey);

    const record = store.getRecord(recordKey);
    if (!record) {
      reply.code(404);
      return { error: 'Record not found' };
    }

    store.deleteRecord(recordKey);
    return { success: true };
  });
};
