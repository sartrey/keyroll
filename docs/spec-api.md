# API 设计规范

**版本**: 2.0
**状态**: 设计

**关联文档**:
- [认证 API](apispecs/authn.md)
- [数据模型与 API](apispecs/model.md)

---

## 基础信息

- **Base URL**: `/api`
- **Content-Type**: `application/json`
- **通信方式**: HTTP only（无 WebSocket）

---

## 统一规范

### 请求方法

所有 API 统一使用 `POST` 方法，动词体现在 pathname 中。

### 请求参数

所有业务参数通过请求体（body）传递，不使用 query 参数。

### 响应格式

```json
// 成功
{ "traceId": "uuid-v4", "content": { ... } }

// 失败
{ "traceId": "uuid-v4", "errorId": "ErrorCode", "content": { ... } }
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `traceId` | string | 请求追踪标识（UUID v4） |
| `errorId` | string | 业务错误标识（PascalCase），仅失败时出现 |
| `content` | unknown | 业务数据或错误详情 |

### 错误码规范

- PascalCase 英文字符串，如 `InvalidRequest`、`RecordNotFound`
- 各模块的详细错误码定义见对应 apispec 文档

---

## 认证机制

- 大部分 API 需要 `Authorization: Bearer <access_token>` 认证
- 豁免认证的 API：
  - `/api/authn/password/*` — Password 认证和创建（内部有独立 AES-GCM 验证）
  - `/api/authn/recovery/*` — RecoveryCode 恢复（内部有独立解密验证）

---

## API 汇总

### 认证 API

| 路径 | 说明 | 认证 |
|------|------|------|
| `/authn/status` | 检查初始化状态 | 否 |
| `/authn/password/create` | 初始化/设置密码 | 否（未初始化）/ 是（已初始化） |
| `/authn/password/verify` | Password 登录 | 否 |
| `/authn/recovery/verify` | RecoveryCode 恢复 | 否 |
| `/authn/sessions/delete` | 登出 | 是 |

详细规范参见 [认证 API](apispecs/authn.md)。

### 数据 API

| 路径 | 说明 | 认证 |
|------|------|------|
| `/model/records/search` | 获取记录列表 | 是 |
| `/model/records/detail` | 获取单条记录 | 是 |
| `/model/records/create` | 创建记录 | 是 |
| `/model/records/update` | 修改记录 | 是 |
| `/model/records/delete` | 软删除记录 | 是 |

详细规范参见 [数据模型与 API](apispecs/model.md)。

---

## HTTP 状态码

| 状态码 | 场景 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 认证失败 |
| 404 | 资源不存在 |
| 429 | 请求速率超限 |
| 500 | 服务器内部错误 |
| 503 | 服务不可用 |
