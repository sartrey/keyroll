# 数据模型

**状态**: 设计

---

## 概述

Keyroll 的数据以 **Record（记录）** 为基本单元，存储在 SQLite 数据库 `~/.keyroll/keyroll.db` 中。
所有凭证和用户数据共存于同一文件，便于单文件备份。

---

## 记录类型 (recordType)

| 类型 | 值 | 说明 |
|------|------|------|
| `inner` | 0 | 系统内部记录，用于凭证等系统级信息 |
| `plain` | 1 | 普通数据记录 |
| `refer` | 2 | 引用记录，指向外部文件对象 |
| `graph` | 3 | 图记录，描述记录间的逻辑指向关系（DAG） |

---

## 安全等级 (secureLevel)

secureLevel 与 recordType 正交，不同 recordType 对 secureLevel 的语义不同。

| recordType \ secureLevel | 0 = Unmanaged | 1 = Protected |
|--------------------------|---------------|---------------|
| `0` inner | 自有秘密保管策略（凭证 blob 自加密） | — |
| `1` plain | recordValue 不加密，明文存储 | recordValue 使用 MasterKey 加密 |
| `2` refer | recordValue 不加密，明文存储 | 仅 blob 本体加密（recordValue 中的 JSON 不加密） |
| `3` graph | JSON 不加密，明文存储 | — |

注："—" 表示该组合无效，不支持此 secureLevel 设置。

**各等级详细说明**：

- **secureLevel 0 (Unmanaged)**：数据不由 MasterKey 管理加密。inner 类型的记录必须使用此等级，其凭证 blob 使用各自的派生密钥（Password/RecoveryCode + salt 通过 scrypt 派生）自加密。plain、refer 和 graph 类型也可以使用此等级，表示明文存储（仅需认证即可访问）。

- **secureLevel 1 (Protected)**：数据由 MasterKey 加密保护，加密方式因 recordType 而异：
  - **plain**：recordValue 本身使用 MasterKey（AES-256-GCM）加密
  - **refer**：仅 blob 本体加密，recordValue 中的 JSON 不加密：
    - **密文存储**：密文文件索引在 `~/.keyroll/blobs/` 目录，文件名为 `integrity` 值（如 `sha256-xxxx.enc`）
    - **小文件（≤4MB）**：复制到 blobs 目录后加密，密文文件直接存放
    - **大文件（>4MB）**：原地加密（在原始路径加密），在 blobs 目录创建软链指向密文文件
    - **密钥派生**：每个 blob 使用 `HKDF(MasterKey, integrity_hash)` 派生独立密钥，避免所有 blob 共享同一 MasterKey
    - **完整性校验**：`integrity` 字段（SRI 格式 `sha256-<base64hash>`）同时承担三重职责：完整性校验、密钥派生盐、blob 文件名
    - **恢复原始文件名**：refer 记录中的 `originSrc` 字段保存原始文件路径，解密恢复时可还原文件名和扩展名

---

## Record Key 格式

Record Key 是树状索引路径，格式为 `/{type}/{domain}/{path}`：

- `/inner/system.authn/password` — 系统内部路径
- `/plain/localhost/user.profile/name` — 普通数据
- `/refer/photos/2024-07/image/1` — 引用数据（按域/日期/类型+序号语义组织）

key 不加密，支持前缀匹配查询。**recordKey 的设计类似知识库的树状索引，具体的路径组织方式随知识库扩展逐步完善，不需要第一天确定所有类型的索引方案。**

---

## 数据库 Schema

```sql
CREATE TABLE IF NOT EXISTS records (
  record_key TEXT PRIMARY KEY NOT NULL,
  record_type INTEGER NOT NULL,
  content_type TEXT NOT NULL,
  secure_level INTEGER DEFAULT 0,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER DEFAULT (strftime('%s', 'now')),
  deleted_at INTEGER,
  record_value TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_records_type ON records(record_type);
CREATE INDEX IF NOT EXISTS idx_records_secure ON records(secure_level);
CREATE INDEX IF NOT EXISTS idx_records_type_key ON records(record_type, record_key);
```

---

## TypeScript 类型

```typescript
export type ERecordType = 'inner' | 'plain' | 'refer' | 'graph';

export interface IRecord {
  recordKey: string;
  recordType: ERecordType;
  contentType: string;
  secureLevel: number;
  createdAt: number;
  updatedAt: number;
  recordValue: string;
}
```

---

## Inner 记录（凭证存储）

凭证以 inner 记录形式存储在 `records` 表中：

| 记录 key | recordValue (JSON) |
|----------|-------------------|
| `/inner/system.authn/password` | `{ "passwordSalt": "<base64>", "masterKeySecret": "<base64>" }` |
| `/inner/system.authn/recovery` | `{ "recoverySeed": "<base64>", "masterKeySecret": "<base64>" }` |

**启动流程**：
1. 打开 SQLite 数据库（无需密钥，数据库文件本身不加密）
2. 读取 inner 凭证记录
3. 使用 Password/RecoveryCode 派生密钥解密 masterKeySecret，得到 MasterKey
4. MasterKey 加载到内存，开始服务

---

## Refer 记录结构

refer 记录的 `recordValue` 存储 JSON 字符串：

```json
{
  "originSrc": "/path/to/original/file.jpg",
  "integrity": "sha256-<base64hash>"
}
```

| 字段 | 说明 |
|------|------|
| `originSrc` | 原始文件路径，用于恢复时还原文件名和扩展名 |
| `integrity` | SRI 格式完整性校验值，同时用作 blobs 目录中的文件名 |

refer 的 recordKey 是树状语义索引路径，按域和子域分类后语义化命名（如 `image/1`、`audio/1`、`video/1`），不记录原始文件名。具体索引路径的组织方式随知识库扩展逐步完善。

---

## 加密设计

### 加密策略

采用字段级加密，不对整个数据库文件加密。

### 加密算法

| 用途 | 算法 | 参数 |
|------|------|------|
| MasterKey 加密 | AES-256-GCM | 密钥 32 字节，IV 12 字节，authTag 16 字节 |
| 密钥派生 | scrypt | N=2^14, r=8, p=1, keyLength=32 |
| Blob 密钥派生 | HKDF | `HKDF(MasterKey, integrity_hash)` |
| 数据完整性 | AES-GCM 内置 authTag | 无需额外 HMAC |

---

## 数据 API

所有 Model API 统一使用 `POST` 方法，路径前缀为 `/api/model/records/`。

大部分 API 需要通过 `Authorization: Bearer <access_token>` header 进行认证。

### POST /model/records/search

获取记录列表（支持过滤）。

**请求参数**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `prefix` | string | 否 | key 前缀匹配 |
| `domain` | string | 否 | 按域过滤 |
| `type` | string | 否 | 按类型过滤 (`inner`/`plain`/`refer`/`graph`) |
| `secureLevel` | number | 否 | 按安全等级过滤 |

**响应（成功）**
```json
{
  "traceId": "uuid-v4",
  "content": {
    "items": [{
      "recordKey": "/plain/localhost/user.profile/name",
      "recordType": "plain",
      "contentType": "text/plain",
      "secureLevel": 0,
      "createdAt": 1710000000,
      "updatedAt": 1710000000,
      "recordValue": "Alice"
    }]
  }
}
```

**错误响应**

| errorId | HTTP | content |
|---------|------|---------|
| `InvalidRequest` | 400 | `{ reason: string }` |

---

### POST /model/records/detail

获取单条记录。

**请求参数**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `recordKey` | string | 是 | 记录的完整 key（路径式 URN） |

**响应（成功）**
```json
{
  "traceId": "uuid-v4",
  "content": {
    "record": { ... }
  }
}
```

**错误响应**

| errorId | HTTP | content |
|---------|------|---------|
| `RecordNotFound` | 404 | `null` |
| `InvalidRecordKey` | 400 | `{ reason: string }` |

---

### POST /model/records/create

创建记录。

**请求参数**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `recordKey` | string | 是 | 记录的完整 key（路径式 URN） |
| `recordType` | string | 是 | 记录类型 (`inner`/`plain`/`refer`/`graph`) |
| `contentType` | string | 是 | 内容类型 (如 `text/plain`, `application/json`) |
| `secureLevel` | number | 否 | 安全等级 (默认 0) |
| `recordValue` | string | 是 | 记录值 |

**响应（成功）**
```json
{
  "traceId": "uuid-v4",
  "content": {}
}
```

**错误响应**

| errorId | HTTP | content |
|---------|------|---------|
| `InvalidRecordType` | 400 | `null` |
| `InvalidRecordKey` | 400 | `{ reason: string }` |

---

### POST /model/records/update

修改记录。

**请求参数**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `recordKey` | string | 是 | 记录的完整 key（路径式 URN） |
| `recordType` | string | 否 | 记录类型 |
| `contentType` | string | 否 | 内容类型 |
| `secureLevel` | number | 否 | 安全等级 |
| `recordValue` | string | 否 | 记录值 |

**响应（成功）**
```json
{
  "traceId": "uuid-v4",
  "content": {}
}
```

**错误响应**

| errorId | HTTP | content |
|---------|------|---------|
| `RecordNotFound` | 404 | `null` |
| `InvalidRecordKey` | 400 | `{ reason: string }` |

---

### POST /model/records/delete

软删除记录。

**请求参数**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `recordKey` | string | 是 | 记录的完整 key（路径式 URN） |

**响应（成功）**
```json
{
  "traceId": "uuid-v4",
  "content": {}
}
```

**错误响应**

| errorId | HTTP | content |
|---------|------|---------|
| `RecordNotFound` | 404 | `null` |
| `InvalidRecordKey` | 400 | `{ reason: string }` |

---

## 错误码

| 错误码 | 说明 |
|--------|------|
| `InvalidRequest` | 请求参数缺失或格式错误 |
| `RecordNotFound` | 指定的记录不存在 |
| `InvalidRecordType` | 无效的 recordType |
| `InvalidRecordKey` | 无效的 recordKey 格式 |
| `Unauthorized` | 未认证（Token 无效或缺失） |
| `TokenExpired` | Token 已过期 |
