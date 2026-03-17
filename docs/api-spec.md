# API 规范

## 基础信息

- **Base URL**: `/api`
- **Content-Type**: `application/json`
- **通信方式**: HTTP only（无 WebSocket）

## 健康检查

### GET /health

```json
// 响应
{ "status": "ok" }
```

## Record 操作

### GET /records

获取记录列表（支持过滤）。

**查询参数**
| 参数 | 说明 | 示例 |
|------|------|------|
| `prefix` | key 前缀匹配 | `/plain/localhost/user.` |
| `domain` | 按域过滤 | `localhost` |
| `type` | 按类型过滤 | `plain` |
| `secureLevel` | 按安全等级过滤 | `0` |

**响应**
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

### GET /records/:key

获取单条记录。

注意：`:key` 需要 URL 编码（因为包含 `/` 字符）。

**请求示例**
```
GET /records/%2Fplain%2Flocalhost%2Fuser.profile%2Fname
```

**响应**
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

### PUT /records/:key

创建或更新记录。

**请求**
```json
{
  "recordType": "plain",
  "recordValue": "Alice",
  "contentType": "text/plain",
  "secureLevel": 0
}
```

**响应**
```json
{ "success": true }
```

### DELETE /records/:key

软删除记录。

**响应**
```json
{ "success": true }
```

## 错误处理

| 状态码 | 说明 |
|--------|------|
| 200 | 成功 |
| 404 | 资源不存在 |
| 400 | 请求参数错误 |
| 500 | 服务器错误 |
