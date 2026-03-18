# 数据模型

## 核心概念

### Record（记录）

Record 是系统的核心存储单元。

| 字段 | 类型 | 说明 |
|------|------|------|
| `recordKey` | string | 记录的唯一标识符（路径式 URN） |
| `recordType` | `plain` \| `refer` | 值类型：朴素值 或 引用 |
| `recordValue` | string | 存储的实际内容 |
| `contentType` | string | 内容类型（类似 HTTP Content-Type，不含编码） |
| `secureLevel` | integer | 安全等级 |
| `createdAt` | integer | 创建时间戳（秒） |
| `updatedAt` | integer | 更新时间戳（秒） |

### Record 类型（recordType）

| 类型 | 说明 | recordValue 格式 |
|------|------|-----------------|
| `plain` | 朴素值 | 纯文本字符串 |
| `refer` | 引用 | 指向其他 Record 的路径式 URN |

**设计意图**: 使用 `refer` 而非 `object` 或 `reference`，强制开发者在语义上理解为"指向他处的引用"，而非"嵌套的对象结构"。

### 内容类型（contentType）

类似 HTTP `Content-Type`，但不包含编码信息（固定为 UTF-8）。

示例：
- `text/plain` - 纯文本
- `application/json` - JSON 数据
- `image/png` - PNG 图片（二进制数据 Base64 编码后存储）

### 安全等级（secureLevel）

| 等级 | 说明 |
|------|------|
| `0` | 公开数据，无特殊保护 |
| `1` | 敏感数据，访问需校验 |
| `2` | 加密数据，存储时加密 |

---

## Key 格式规范

### 路径式 URN 结构

```
/<type>/<domain>/<namespace>/<name>
```

| 分段 | 说明 | 示例 |
|------|------|------|
| `<type>` | 记录类型 | `plain`, `refer` |
| `<domain>` | 域（作用域） | `localhost`, `github.com` |
| `<namespace>` | 命名空间（点分隔） | `user.profile`, `app.config` |
| `<name>` | 记录名称 | `name`, `avatar` |

### 完整示例

```
/plain/localhost/user.profile/name
/plain/localhost/user.profile/email
/refer/localhost/user.profile/avatar
/plain/github.com/user.repo/main
/refer/twitter.com/user.tweets/latest
```

### 域（Domain）说明

| 域 | 用途 |
|------|------|
| `localhost` | 本地私有数据 |
| `github.com` | GitHub 相关数据 |
| `twitter.com` | Twitter 相关数据 |
| ... | 其他第三方服务 |

---

## 域注册表（Domain Registry）

### 概述

域注册表是一个**全局共享的元数据表**，独立于本地数据存储。

- **存储方式**: 线上发布，随 Keyroll 版本更新
- **用途**: 记录已注册的域及其元数据

### 域元数据结构

```json
{
  "domain": "github.com",
  "description": "GitHub repository and user data",
  "owner": "Keyroll",
  "registeredAt": "2026-03-17"
}
```

### 本地数据设计

**域不存储在本地**，原因：
- 域是全局共享概念，不是用户私有数据
- 减少本地数据冗余
- 域信息变更无需同步用户数据

---

## 数据库表结构

### records（记录表）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| record_key | TEXT | PRIMARY KEY | 路径式 URN |
| record_type | TINYINT | NOT NULL | 0=plain, 1=refer |
| record_value | TEXT | NOT NULL | 存储内容 |
| content_type | TEXT | NOT NULL | 内容类型 |
| secure_level | INTEGER | DEFAULT 0 | 安全等级 |
| created_at | INTEGER | NOT NULL | 创建时间戳（秒） |
| updated_at | INTEGER | NOT NULL | 更新时间戳（秒） |
| deleted_at | INTEGER | NULL | 删除时间戳（软删除） |

### record_type 枚举

| 值 | 类型 |
|------|------|
| `0` | plain |
| `1` | refer |

### 索引设计

```sql
-- record_key 本身是主键，已隐含索引
-- 支持前缀匹配查询：WHERE record_key LIKE '/plain/localhost/user.%'

-- 按类型查询
CREATE INDEX idx_records_type ON records(record_type);

-- 按安全等级查询
CREATE INDEX idx_records_secure ON records(secure_level);

-- 复合查询优化（类型 + key 前缀）
CREATE INDEX idx_records_type_key ON records(record_type, record_key);
```

---

## TypeScript 类型定义

### shared/types.ts

```typescript
export type ERecordType = 'plain' | 'refer';

export interface KeyrollRecord {
  recordKey: string;
  recordType: ERecordType;
  recordValue: string;
  contentType: string;
  secureLevel: number;
  createdAt: number;
  updatedAt: number;
}
```

---

## 移除的概念

以下概念**不实现**：
- ~~Volume~~ - 通过 key 的命名空间组织数据
- ~~Device~~ - 单用户本地存储
- ~~Sync Log~~ - 无多设备同步需求
- ~~版本管理~~ - 由用户在 name 中自行实现
- ~~本地域存储~~ - 域是全局元数据，不存储于本地
