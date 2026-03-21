# 数据 API 详细规范

**版本**: 1.0
**状态**: 设计

**关联文档**: [API 设计规范](../spec-api.md)

---

## 概述

本文档定义 Keyroll 系统的数据 API 详细规范，涵盖 Record 的查询、创建、更新和删除操作。

所有 Model API 的路径前缀为 `/api/model/records/`。

大部分 API 需要通过 `Authorization: Bearer <access_token>` header 进行认证。

---

## API 列表

### POST /model/records/list

获取记录列表（支持过滤）。

**请求参数**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `prefix` | string | 否 | key 前缀匹配 |
| `domain` | string | 否 | 按域过滤 |
| `type` | string | 否 | 按类型过滤 (`plain` 或 `refer`) |
| `secureLevel` | number | 否 | 按安全等级过滤 |

**响应（成功）**
```json
{
  "traceId": "uuid-v4",
  "content": {
    "items": [{
      "recordKey": "/plain/localhost/user.profile/name",
      "recordType": "plain",
      "recordValue": "Alice",
      "contentType": "text/plain",
      "secureLevel": 0,
      "createdAt": 1710000000,
      "updatedAt": 1710000000
    }]
  }
}
```

**错误响应**

| errorId | HTTP | content |
|---------|------|---------|
| `InvalidRequest` | 400 | `{ reason: string }` |

---

### POST /model/records/get

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

### POST /model/records/upsert

创建或更新记录。

**请求参数**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `recordKey` | string | 是 | 记录的完整 key（路径式 URN） |
| `recordType` | string | 是 | 记录类型 (`plain` 或 `refer`) |
| `recordValue` | string | 是 | 记录值 |
| `contentType` | string | 是 | 内容类型 (如 `text/plain`, `application/json`) |
| `secureLevel` | number | 否 | 安全等级 (默认 0) |

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
| `InvalidRecordType` | 无效的 recordType（必须是 `plain` 或 `refer`） |
| `InvalidRecordKey` | 无效的 recordKey 格式 |
| `Unauthorized` | 未认证（Token 无效或缺失） |
| `TokenExpired` | Token 已过期 |
