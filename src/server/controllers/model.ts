import { randomUUID, createHash } from 'node:crypto';

import { FastifyPluginCallback } from 'fastify';

import Database from '../services/database.js';
import { saveFileToBlobs, saveBlobToDisk } from '../services/blob.js';
import type { IRecord, ERecordType } from '../../shared/types.js';

async function computeFileIntegrityFromBuffer(data: Buffer): Promise<string> {
  const hash = createHash('sha256').update(data).digest('base64');
  return `sha256-${hash}`;
}

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
    return {
      traceId: randomUUID(),
      content: { items }
    };
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
      return {
        traceId: randomUUID(),
        errorId: 'RecordNotFound',
        content: null
      };
    }
    return {
      traceId: randomUUID(),
      content: { record }
    };
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
      return {
        traceId: randomUUID(),
        errorId: 'InvalidRequest',
        content: { reason: 'Missing required fields: recordKey, recordType, recordValue, contentType' }
      };
    }

    if (!['plain', 'refer', 'graph'].includes(body.recordType)) {
      reply.code(400);
      return {
        traceId: randomUUID(),
        errorId: 'InvalidRecordType',
        content: null
      };
    }

    const validPrefixes: Record<string, string[]> = {
      plain: ['/plain/', '/inner/'],
      refer: ['/refer/'],
      graph: ['/graph/']
    };
    const allowed = validPrefixes[body.recordType] || [];
    if (!allowed.some(p => body.recordKey.startsWith(p))) {
      reply.code(400);
      return {
        traceId: randomUUID(),
        errorId: 'InvalidRecordKey',
        content: { reason: `Invalid key format. Must start with ${allowed.join(' or ')}` }
      };
    }

    let finalRecordValue = body.recordValue;
    if (body.recordType === 'refer') {
      try {
        const refValue = JSON.parse(body.recordValue) as { originSrc?: string; integrity?: string; };
        if (refValue.originSrc && !refValue.originSrc.startsWith('http://') && !refValue.originSrc.startsWith('https://')) {
          const { integrity } = await saveFileToBlobs(refValue.originSrc);
          finalRecordValue = JSON.stringify({ ...refValue, integrity });
        }
      } catch {
        // recordValue is not valid JSON, let the record be created as-is
      }
    }

    const record = {
      recordKey: body.recordKey,
      recordType: body.recordType as ERecordType,
      recordValue: finalRecordValue,
      contentType: body.contentType,
      secureLevel: body.secureLevel ?? 0,
      createdAt: Date.now() / 1000,
      updatedAt: Date.now() / 1000
    } satisfies IRecord;

    store.upsertRecord(record);
    return {
      traceId: randomUUID(),
      content: {}
    };
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
      return {
        traceId: randomUUID(),
        errorId: 'RecordNotFound',
        content: null
      };
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
    return {
      traceId: randomUUID(),
      content: {}
    };
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
      return {
        traceId: randomUUID(),
        errorId: 'RecordNotFound',
        content: null
      };
    }

    store.deleteRecord(recordKey);
    return {
      traceId: randomUUID(),
      content: {}
    };
  });

  /**
   * POST /model/records/sync-refer
   * 同步远程 refer 记录到本地
   */
  fastify.post<{ Body: { recordKey: string; }; }>('/model/records/sync-refer', async (request, reply) => {
    const store = Database.getInstance();
    const { recordKey } = request.body;

    const source = store.getRecord(recordKey);
    if (!source) {
      reply.code(404);
      return {
        traceId: randomUUID(),
        errorId: 'RecordNotFound',
        content: null
      };
    }

    if (source.recordType !== 'refer') {
      reply.code(400);
      return {
        traceId: randomUUID(),
        errorId: 'ReferRecordInvalid',
        content: null
      };
    }

    let refValue: { originSrc?: string; integrity?: string; };
    try {
      refValue = JSON.parse(source.recordValue);
    } catch {
      reply.code(400);
      return {
        traceId: randomUUID(),
        errorId: 'SyncFailed',
        content: { reason: 'Invalid refer recordValue format' }
      };
    }

    if (!refValue.originSrc || (!refValue.originSrc.startsWith('http://') && !refValue.originSrc.startsWith('https://'))) {
      reply.code(400);
      return {
        traceId: randomUUID(),
        errorId: 'SyncFailed',
        content: { reason: 'originSrc is not a valid HTTP URL' }
      };
    }

    try {
      const response = await fetch(refValue.originSrc);
      if (!response.ok) {
        reply.code(502);
        return {
          traceId: randomUUID(),
          errorId: 'SyncFailed',
          content: { reason: `Download failed: ${response.status} ${response.statusText}` }
        };
      }
      const fileData = Buffer.from(await response.arrayBuffer());
      const integrity = await computeFileIntegrityFromBuffer(fileData);
      saveBlobToDisk(fileData, integrity);

      // verify integrity if source had one
      if (refValue.integrity && refValue.integrity !== integrity) {
        reply.code(400);
        return {
          traceId: randomUUID(),
          errorId: 'SyncFailed',
          content: { reason: 'Integrity mismatch with source' }
        };
      }

      const syncKey = `${source.recordKey}/sync`;
      const syncRecordValue = JSON.stringify({ originSrc: refValue.originSrc, integrity });
      const syncRecord: IRecord = {
        recordKey: syncKey,
        recordType: 'refer',
        recordValue: syncRecordValue,
        contentType: source.contentType,
        secureLevel: source.secureLevel,
        createdAt: Date.now() / 1000,
        updatedAt: Date.now() / 1000
      };
      store.upsertRecord(syncRecord);

      return {
        traceId: randomUUID(),
        content: { localRecordKey: syncKey }
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      reply.code(500);
      return {
        traceId: randomUUID(),
        errorId: 'SyncFailed',
        content: { message }
      };
    }
  });
};
