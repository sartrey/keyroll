# API 设计规范

**版本**: 1.0
**状态**: 设计

**关联文档**:
- [认证 API](apispecs/authn.md)
- [数据 API](apispecs/model.md)

---

## 基础信息

- **Base URL**: `/api`
- **Content-Type**: `application/json`
- **通信方式**: HTTP only（无 WebSocket）

---

## 统一规范

### 请求方法

所有 API 统一使用 `POST` 方法，动词体现在 pathname 中。

**设计理由**：
- 避免 HTTP 语义在 query/body 的耦合
- 简化客户端实现（统一使用 POST）
- 便于日志记录和调试

### 请求参数

所有业务参数通过请求体（body）传递，不使用 query 参数。

### 响应格式

所有 API 响应遵循统一结构：

```json
// 成功响应
{
  "traceId": "uuid-v4",
  "content": { ... }
}

// 错误响应
{
  "traceId": "uuid-v4",
  "errorId": "ErrorCode",
  "content": { ... }
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `traceId` | string | 请求追踪标识（UUID v4），用于前后端对照和全链路跟踪 |
| `errorId` | string | 业务错误标识（大驼峰格式），仅在失败时出现 |
| `content` | unknown | 业务数据。成功时包含响应内容；失败时可为 `null`、空对象或包含错误详情 |

### 成功/失败判定

- **成功**: 无 `errorId` 字段，`content` 包含业务数据
- **失败**: `errorId` 非 `null`，描述具体错误类型

### 错误码规范

错误码使用大驼峰格式（PascalCase）的英文字符串。

示例：`InvalidRequest`, `CredentialNotFound`, `SignatureInvalid`

### 错误详情

错误详情可包含在 `content` 字段中：

```json
{
  "traceId": "uuid-v4",
  "errorId": "ServerError",
  "content": "Error: Database connection failed..."
}
```

---

## 认证机制

### BearerToken 认证

大部分 API 需要通过 `Authorization` header 传递 BearerToken：

```
Authorization: Bearer <access_token>
```

### 豁免认证的 API

以下 API 不需要认证（用于登录和恢复）：
- `/api/authn/password/*` - 密码认证
- `/api/authn/recovery/*` - RecoveryCode 恢复
- `/api/authn/sessions/*` - 会话管理（需要认证）

---

## API 列表

## 认证 API

认证相关 API 包括密码认证、MasterKey 获取，以及 RecoveryCode 恢复流程。

**详细规范参见**: [认证 API 详细规范](apispecs/authn.md)

### API 路径概览

| 路径 | 说明 | 认证 |
|------|------|------|
| `/authn/password/create` | 系统初始化/设置密码 | 否（未初始化时）/ 是（已初始化时） |
| `/authn/passkeys/create` | Passkey 注册 | 是 |
| `/authn/passkeys/verify` | Passkey 登录认证 | 否 |
| `/authn/passkeys/delete` | Passkey 移除 | 是 |
| `/authn/recovery/verify` | 验证 RecoveryCode，进入重设密码流程 | 否 |
| `/authn/password/verify` | 验证密码（登录或解密 MasterKey） | 否（登录）/ 是（解密） |
| `/authn/password/update` | 重设密码（RecoveryCode 恢复后） | 否 |
| `/authn/sessions/delete` | 删除会话（登出） | 是 |

---

## 数据 API

数据 API 用于管理 Record 数据，包括查询、创建、更新和删除操作。

**详细规范参见**: [数据 API 详细规范](apispecs/model.md)

### API 路径概览

| 路径 | 说明 | 认证 |
|------|------|------|
| `/model/records/list` | 获取记录列表（支持过滤） | 是 |
| `/model/records/get` | 获取单条记录 | 是 |
| `/model/records/upsert` | 创建或更新记录 | 是 |
| `/model/records/delete` | 软删除记录 | 是 |

---

## 错误码汇总

### 通用错误码

| 错误码 | 说明 |
|--------|------|
| `InvalidRequest` | 请求参数缺失或格式错误 |
| `RecordNotFound` | 指定的记录不存在 |
| `InvalidRecordType` | 无效的 recordType（必须是 `plain` 或 `refer`） |
| `InvalidRecordKey` | 无效的 recordKey 格式 |
| `Unauthorized` | 未认证（Token 无效或缺失） |
| `ServerError` | 服务器内部错误 |
| `ServiceUnavailable` | 服务不可用（未初始化或已锁定） |

### 认证相关错误码

| 错误码 | 说明 |
|--------|------|
| `SignatureInvalid` | Passkey 签名验证失败 |
| `ChallengeExpired` | 挑战已过期（超过 5 分钟） |
| `ChallengeNotFound` | 挑战 ID 不存在 |
| `TokenInvalid` | AccessToken 无效或不存在 |
| `RecoveryCodeInvalid` | RecoveryCode 格式错误或验证失败 |
| `RecoveryAttemptExceeded` | 恢复尝试次数超限 |
| `PasswordInvalid` | 密码格式错误或验证失败 |
| `PasswordAttemptExceeded` | 密码尝试次数超限 |

---

## HTTP 状态码使用

| HTTP 状态码 | 使用场景 |
|-------------|----------|
| 200 | 成功 |
| 201 | 资源创建成功（如注册完成） |
| 400 | 请求参数错误 |
| 401 | 认证失败（签名无效、Token 无效、密码错误） |
| 404 | 资源不存在（Challenge、Credential、Record） |
| 409 | 资源冲突（重复注册） |
| 410 | 资源已过期（Challenge） |
| 429 | 请求速率超限 |
| 500 | 服务器内部错误 |
| 503 | 服务不可用（未初始化） |
