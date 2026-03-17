# 产品设计文档

## 产品定位

**Keyroll** 是一个 single-user、local-first 的个人数据存储系统。

核心目标：提供一个简单、可靠的数据存储层，让开发者可以轻松地以结构化方式存储和管理个人数据。

---

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

### 设计意图

1. **域作为作用域**: 明确数据归属，避免命名冲突
2. **路径风格**: 刻意避免与 URL 混淆，保持内部标识符的纯粹性
3. **前缀匹配友好**: 支持高效的 `LIKE '/plain/localhost/user.%'` 查询

---

## 域注册表（Domain Registry）

### 概述

域注册表是一个**全局共享的元数据表**，独立于本地数据存储。

- **存储方式**: 线上发布，随 Keyroll 版本更新
- **用途**: 记录已注册的域及其元数据
- **访问点**: `TODO` - 待设计（可能是静态 JSON 文件或 API）

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

## 数据模型

### 表结构

**records（记录表）**

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

### 移除的概念

以下概念**不实现**：
- ~~Volume~~ - 通过 key 的命名空间组织数据
- ~~Device~~ - 单用户本地存储
- ~~Sync Log~~ - 无多设备同步需求
- ~~版本管理~~ - 由用户在 name 中自行实现
- ~~本地域存储~~ - 域是全局元数据，不存储于本地

---

## API 设计（草案）

### 基础信息

- **Base URL**: `/api`
- **Content-Type**: `application/json`

### Record 操作

#### GET /records

获取记录列表（支持过滤）。

```
GET /records?prefix=/plain/localhost/user.
GET /records?domain=localhost
GET /records?type=plain
GET /records?secureLevel=0
```

响应：
```json
[
  {
    "recordKey": "/plain/localhost/user.profile/name",
    "recordType": "plain",
    "recordValue": "Alice",
    "contentType": "text/plain",
    "secureLevel": 0,
    "createdAt": 1710000000,
    "updatedAt": 1710000000
  }
]
```

#### GET /records/:key

获取单条记录。

注意：`:key` 需要 URL 编码，因为包含 `/` 字符。
```
GET /records/%2Fplain%2Flocalhost%2Fuser.profile%2Fname
```

响应：
```json
{
  "recordKey": "/plain/localhost/user.profile/name",
  "recordType": "plain",
  "recordValue": "Alice",
  "contentType": "text/plain",
  "secureLevel": 0,
  "createdAt": 1710000000,
  "updatedAt": 1710000000
}
```

#### PUT /records/:key

创建或更新记录。

```json
{
  "recordType": "plain",
  "recordValue": "Alice",
  "contentType": "text/plain",
  "secureLevel": 0
}
```

响应：
```json
{ "success": true }
```

#### DELETE /records/:key

软删除记录。

响应：
```json
{ "success": true }
```

---

## 阶段规划

### Phase 1（当前）

- [ ] 实现基础 Record 存储（plain 类型）
- [ ] 实现路径式 key 格式解析（包含 domain）
- [ ] 实现 contentType 和 secureLevel 字段
- [ ] 移除 Volume、Device、版本管理相关代码
- [ ] 字段重命名：添加 `record` 前缀
- [ ] 主键使用 record_key 而非 UUID
- [ ] record_type 使用 TINYINT 而非 TEXT

### Phase 2（未来）

- [ ] 支持 refer 类型
- [ ] 实现引用完整性检查
- [ ] 实现安全等级访问控制
- [ ] 域注册表发布机制（TODO）

### Phase 3（探索）

- [ ] 加密存储（secureLevel=2）
- [ ] 查询语言支持

---

## 开放问题

1. **Key 校验**: 是否需要严格的 key 格式校验规则？
2. **contentType 枚举**: 是否预定义允许的 contentType 列表？
3. **secureLevel=2 加密**: 使用什么加密算法？密钥如何管理？
4. **refer 的 recordValue 格式**: 直接存储目标 key 字符串，还是 JSON 对象？
5. **域注册表访问点**: 线上发布的具体形式？（静态 JSON / API / 其他）
6. **record_type 存储**: 使用 TINYINT(0/1) 还是保留 TEXT 校验？

---

## 设计决策记录

| 日期 | 决策 | 说明 |
|------|------|------|
| 2026-03-17 | 移除 Volume 概念 | 简化产品，通过 key 命名空间组织数据 |
| 2026-03-17 | 移除 Device 概念 | 聚焦单用户本地存储场景 |
| 2026-03-17 | 确定 Record 核心字段 | recordKey, recordType, recordValue, contentType, secureLevel |
| 2026-03-17 | 字段添加 record 前缀 | 避免与通用术语混淆 |
| 2026-03-17 | Key 使用路径风格 | 刻意混淆，避免与 URL 混淆 |
| 2026-03-17 | 类型命名为 refer | 强调是引用而非结构值 |
| 2026-03-17 | 移除系统级版本管理 | 由用户在 name 中自行实现 |
| 2026-03-17 | 主键使用 record_key | 支持高效前缀匹配查询 |
| 2026-03-17 | 添加域（Domain）概念 | 使用域名作为作用域标识 |
| 2026-03-17 | 域不存储于本地 | 域是全局共享元数据 |
| 2026-03-17 | record_type 使用 TINYINT | 0=plain, 1=refer，节省存储空间 |
