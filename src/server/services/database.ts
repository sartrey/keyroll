import { join } from 'node:path';
import { homedir } from 'node:os';

import SqliteDatabase from 'better-sqlite3';

import type { IRecord, ERecordType } from '../../shared/types.js';

export class DataStore {
  private db: SqliteDatabase.Database;

  constructor(dbPath: string = join(homedir(), '.keyroll', 'keyroll.db')) {
    this.db = new SqliteDatabase(dbPath);
    // 单文件存储模式，不启用 WAL
  }

  initialize(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS records (
        record_key TEXT PRIMARY KEY NOT NULL,
        record_type INTEGER NOT NULL,
        content_type TEXT NOT NULL,
        secure_level INTEGER DEFAULT 0,
        created_at INTEGER DEFAULT (strftime('%s', 'now')),
        updated_at INTEGER DEFAULT (strftime('%s', 'now')),
        deleted_at INTEGER,
        record_value TEXT NOT NULL
      )
    `);

    // 索引：支持按类型查询
    this.db.exec(`
      CREATE INDEX IF NOT EXISTS idx_records_type ON records(record_type)
    `);

    // 索引：支持按安全等级查询
    this.db.exec(`
      CREATE INDEX IF NOT EXISTS idx_records_secure ON records(secure_level)
    `);

    // 复合索引：支持类型 +key 前缀查询
    this.db.exec(`
      CREATE INDEX IF NOT EXISTS idx_records_type_key ON records(record_type, record_key)
    `);
  }

  private recordTypeToInt(type: ERecordType): number {
    return type === 'inner' ? 0 : type === 'plain' ? 1 : type === 'refer' ? 2 : 3;
  }

  private intToRecordType(int: number): ERecordType {
    return int === 0 ? 'inner' : int === 1 ? 'plain' : int === 2 ? 'refer' : 'graph';
  }

  private rowToRecord(row: Record<string, unknown>): IRecord {
    return {
      recordKey: row.record_key as string,
      recordType: this.intToRecordType(row.record_type as number),
      contentType: row.content_type as string,
      secureLevel: row.secure_level as number,
      createdAt: row.created_at as number,
      updatedAt: row.updated_at as number,
      recordValue: row.record_value as string
    };
  }

  /**
   * 创建记录
   */
  createRecord(record: IRecord): void {
    const stmt = this.db.prepare(`
      INSERT INTO records (record_key, record_type, content_type, secure_level, created_at, updated_at, record_value)
      VALUES (?, ?, ?, ?, strftime('%s', 'now'), strftime('%s', 'now'), ?)
    `);
    stmt.run(
        record.recordKey,
        this.recordTypeToInt(record.recordType),
        record.contentType,
        record.secureLevel,
        record.recordValue
    );
  }

  /**
   * 更新记录
   */
  updateRecord(recordKey: string, updates: Partial<Pick<IRecord, 'recordType' | 'contentType' | 'secureLevel' | 'recordValue'>>): void {
    const sets: string[] = [];
    const params: unknown[] = [];

    if (updates.recordType !== undefined) {
      sets.push('record_type = ?');
      params.push(this.recordTypeToInt(updates.recordType));
    }
    if (updates.contentType !== undefined) {
      sets.push('content_type = ?');
      params.push(updates.contentType);
    }
    if (updates.secureLevel !== undefined) {
      sets.push('secure_level = ?');
      params.push(updates.secureLevel);
    }
    if (updates.recordValue !== undefined) {
      sets.push('record_value = ?');
      params.push(updates.recordValue);
    }

    if (sets.length === 0) {
      return;
    }

    sets.push("updated_at = strftime('%s', 'now')");
    sets.push('deleted_at = NULL');
    params.push(recordKey);

    const stmt = this.db.prepare(`UPDATE records SET ${sets.join(', ')} WHERE record_key = ?`);
    stmt.run(...params);
  }

  /**
   * 创建或更新记录（兼容旧接口）
   */
  upsertRecord(record: IRecord): void {
    const stmt = this.db.prepare(`
      INSERT INTO records (record_key, record_type, content_type, secure_level, created_at, updated_at, record_value)
      VALUES (?, ?, ?, ?, strftime('%s', 'now'), strftime('%s', 'now'), ?)
      ON CONFLICT(record_key) DO UPDATE SET
        record_type = excluded.record_type,
        content_type = excluded.content_type,
        secure_level = excluded.secure_level,
        updated_at = strftime('%s', 'now'),
        deleted_at = NULL,
        record_value = excluded.record_value
    `);
    stmt.run(
        record.recordKey,
        this.recordTypeToInt(record.recordType),
        record.contentType,
        record.secureLevel,
        record.recordValue
    );
  }

  /**
   * 获取所有记录（支持前缀过滤）
   */
  getRecords(options?: { prefix?: string; domain?: string; type?: ERecordType; secureLevel?: number; }): IRecord[] {
    let sql = 'SELECT * FROM records WHERE deleted_at IS NULL';
    const params: unknown[] = [];

    if (options?.prefix) {
      sql += ' AND record_key LIKE ?';
      params.push(options.prefix + '%');
    }

    if (options?.domain) {
      sql += ' AND record_key LIKE ?';
      params.push(`/%/${options.domain}/%`);
    }

    if (options?.type) {
      sql += ' AND record_type = ?';
      params.push(this.recordTypeToInt(options.type));
    }

    if (options?.secureLevel !== undefined) {
      sql += ' AND secure_level = ?';
      params.push(options.secureLevel);
    }

    const stmt = this.db.prepare(sql);
    const rows = stmt.all(...params);
    return rows.map((row) => this.rowToRecord(row as Record<string, unknown>));
  }

  /**
   * 获取单条记录
   */
  getRecord(recordKey: string): IRecord | null {
    const stmt = this.db.prepare('SELECT * FROM records WHERE record_key = ? AND deleted_at IS NULL');
    const row = stmt.get(recordKey);
    if (!row) {
      return null;
    }
    return this.rowToRecord(row as Record<string, unknown>);
  }

  /**
   * 删除记录（软删除）
   */
  deleteRecord(recordKey: string): void {
    const stmt = this.db.prepare(`
      UPDATE records SET deleted_at = strftime('%s', 'now'), updated_at = strftime('%s', 'now')
      WHERE record_key = ?
    `);
    stmt.run(recordKey);
  }

  /**
   * 获取 inner 记录（系统内部记录不会软删除）
   */
  getInnerRecord(recordKey: string): IRecord | null {
    const stmt = this.db.prepare('SELECT * FROM records WHERE record_key = ? AND record_type = 0');
    const row = stmt.get(recordKey);
    if (!row) { return null; }
    return this.rowToRecord(row as Record<string, unknown>);
  }

  /**
   * 创建或更新 inner 记录
   */
  upsertInnerRecord(record: IRecord): void {
    const stmt = this.db.prepare(`
      INSERT INTO records (record_key, record_type, content_type, secure_level, created_at, updated_at, record_value)
      VALUES (?, 0, ?, 0, strftime('%s', 'now'), strftime('%s', 'now'), ?)
      ON CONFLICT(record_key) DO UPDATE SET
        content_type = excluded.content_type,
        secure_level = excluded.secure_level,
        updated_at = strftime('%s', 'now'),
        deleted_at = NULL,
        record_value = excluded.record_value
    `);
    stmt.run(record.recordKey, record.contentType, record.recordValue);
  }

  /**
   * 检查是否存在 inner 凭证记录（启动自检用）
   */
  hasInnerCredentials(): boolean {
    const stmt = this.db.prepare(
        "SELECT COUNT(*) as cnt FROM records WHERE record_key = '/inner/system.authn/password' AND deleted_at IS NULL"
    );
    const row = stmt.get() as { cnt: number; };
    return row.cnt > 0;
  }

  close(): void {
    this.db.close();
  }
}

let instance: DataStore | null = null;

export default class Database {
  static getInstance(): DataStore {
    if (!instance) {
      instance = new DataStore();
    }
    return instance;
  }
}
