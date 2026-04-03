# 认证 API 详细规范

**状态**: 设计中
**关联文档**: [API 设计规范](../spec-api.md), [用户认证与安全](../features/auth-security.md)

---

## 概述

本文档定义 Keyroll 系统的认证 API 详细规范。所有 API 遵循统一的 [响应格式](../spec-api.md#响应格式)。

**设计原则**：
- **Password 登录**：唯一的登录方式，登录即解密 MasterKey
- **RecoveryCode 恢复**：最终恢复手段，用于重设 Password
- **初始化是启动自检**：服务端启动时检查 inner 凭证记录，无需独立初始化 API
- **无 passwordHash**：直接使用 AES-GCM authTag 验证密码

---

## 错误码

| 错误码 | HTTP | 说明 |
|--------|------|------|
| `InvalidRequest` | 400 | 请求参数缺失或格式错误 |
| `TokenInvalid` | 401 | AccessToken 无效或不存在 |
| `RecoveryCodeInvalid` | 401 | RecoveryCode 格式错误或验证失败 |
| `RecoveryAttemptExceeded` | 429 | 恢复尝试次数超限 |
| `PasswordInvalid` | 401 | Password 格式错误或验证失败 |
| `PasswordAttemptExceeded` | 429 | Password 尝试次数超限 |
| `NotInitialized` | 503 | 系统未初始化 |
| `ServerError` | 500 | 服务器内部错误 |

---

## 系统状态检查

### GET /authn/status

检查系统初始化状态。

**前置条件**：无

**请求**
```http
GET /authn/status
```

**响应（成功）**
```json
{
  "traceId": "uuid-v4",
  "content": {
    "initialized": true
  }
}
```

**响应说明**
- `initialized`: 系统是否已初始化（keyroll.db 中存在 inner 凭证记录）

**错误响应**
| errorId | HTTP |
|---------|------|
| `ServerError` | 500 |

---

## 系统初始化（启动自检）

系统初始化是服务端启动时的自检流程，不是 API 端点。

1. 打开 `~/.keyroll/keyroll.db`
2. 查询 inner 凭证记录是否存在
3. 如果未初始化，进入配置等待状态；如果已初始化，等待认证

**首次配置方式**：CLI `keyroll setup` 命令或 Web 配置向导。

配置完成后生成 MasterKey、RecoveryCode + recoverySeed、Password，保存 inner 凭证记录，等待认证。

---

## Password 管理

### POST /authn/password/create

设置或更新 Password。

**前置条件**：
- 系统未初始化：无前置条件
- 系统已初始化：需要 AccessToken

**请求**
```json
{
  "password": "123456"
}
```

**响应（成功）**
```json
{
  "traceId": "uuid-v4",
  "content": {
    "recoveryCode": "XXXX-XXXX-XXXX-XXXX-XXXX"
  }
}
```

**响应说明**
- 系统未初始化时：返回 RecoveryCode
- 系统已初始化时：返回成功

**错误响应**
| errorId | HTTP |
|---------|------|
| `InvalidRequest` | 400 |
| `TokenInvalid` | 401 | 系统已初始化但未提供认证 |

---

### POST /authn/password/verify

Password 登录验证。登录成功同时完成 MasterKey 解密。

**前置条件**：系统已初始化

**请求**
```json
{
  "password": "123456"
}
```

**响应（成功）**
```json
{
  "traceId": "uuid-v4",
  "content": {
    "accessToken": "uuid-v4",
    "expiresIn": 1800,
    "tokenType": "Bearer"
  }
}
```

**响应说明**
- 服务端使用 Password + passwordSalt 派生密钥，解密 masterKeySecret（AES-GCM authTag 验证）
- 验证成功颁发 AccessToken，MasterKey 已加载到内存

**错误响应**
| errorId | HTTP |
|---------|------|
| `PasswordInvalid` | 401 |
| `PasswordAttemptExceeded` | 429 |
| `NotInitialized` | 503 |

---

### POST /authn/password/update

更新 Password（修改密码）。

**前置条件**：系统已初始化，已认证

**请求**
```json
{
  "password": "123456"
}
```

**响应（成功）**
```json
{
  "traceId": "uuid-v4",
  "content": {
    "message": "Password 更新成功"
  }
}
```

**响应说明**
- 使用现有 Password 派生密钥解密 MasterKey，再用新 Password 重新加密
- 同时销毁现有会话（所有 Token 失效）

**错误响应**
| errorId | HTTP |
|---------|------|
| `InvalidRequest` | 400 |
| `TokenInvalid` | 401 |
| `PasswordInvalid` | 401 |
| `PasswordAttemptExceeded` | 429 |

---

## RecoveryCode 恢复

### POST /authn/recovery/verify

使用 RecoveryCode 验证身份，恢复 MasterKey 并进入重设 Password 流程。

**前置条件**：系统已初始化

**请求**
```json
{
  "recoveryCode": "A1B2-C3D4-E5F6-G7H8-I9J0"
}
```

**响应（成功）**
```json
{
  "traceId": "uuid-v4",
  "content": {
    "message": "RecoveryCode 验证成功，更新密码",
    "nextStep": "/authn/password/update"
  }
}
```

**响应说明**
- 使用 RecoveryCode + recoverySeed 通过 scrypt 派生密钥，解密 recovery.masterKeySecret
- MasterKey 加载到内存
- 清理现有 password 数据（用户需重新设置）
- 客户端需调用 `/authn/password/update` 设置新 Password

**错误响应**
| errorId | HTTP |
|---------|------|
| `RecoveryCodeInvalid` | 401 |
| `RecoveryAttemptExceeded` | 429 |
| `NotInitialized` | 503 |

---

## 会话管理

### POST /authn/sessions/delete

删除会话（登出）。

**请求**
```http
POST /authn/sessions/delete
Authorization: Bearer <access_token>
```

**响应（成功）**
```json
{
  "traceId": "uuid-v4",
  "content": {}
}
```

**响应说明**
- 服务端从内存会话表中删除 Token
- 客户端页面关闭或跳转后会话自然过期

**错误响应**
| errorId | HTTP |
|---------|------|
| `TokenInvalid` | 401 |
