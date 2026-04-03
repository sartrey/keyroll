# 用户认证与安全

**状态**: 设计中

## 概述

认证和安全是 Keyroll 的核心能力。本产品采用 local-first 设计，认证机制围绕单用户本地存储场景设计。

---

## 用户认证

### 认证模式

- 单用户认证：系统仅支持单一用户
- 本地认证：凭证存储在 `keyroll.db` 的 inner 类型记录中

### 认证方式

| 凭证 | 用途 | 说明 |
|------|------|------|
| **Password** | 登录认证 + MasterKey 解密 | 6-16 位数字密码，登录时直接解密 masterKeySecret |
| **RecoveryCode** | 紧急恢复 | 最终恢复手段，用于重设 Password |

### 设计原则

- **初始化是启动自检**：服务端启动时检查 inner 凭证记录，无需独立初始化 API
- **首次配置**：通过 `keyroll setup` CLI 或 Web 设置 Password
- **单文件备份**：所有数据（凭证 + 用户数据）存储在 keyroll.db 中

---

## 凭证存储

### 存储位置

`keyroll.db` 中的 inner 类型记录，与用户数据在同一文件中。

### 为什么凭证可以存储在数据库中

原设计将凭证存储在独立的 `credentials.json` 中，理由是"读取凭证 → 需解密数据库 → 需 MasterKey → 死循环"。

**打破死循环的方法**：inner 凭证记录**不使用 MasterKey 加密**，而是用各自的派生密钥（Password 或 RecoveryCode + salt）自加密。

启动时：打开 SQLite → 读取 inner 记录 → 用 Password/RecoveryCode 派生密钥解密 → 得到 MasterKey → 内存持有。

### 设计决策汇总

| 决策 | 依据 |
|------|------|
| **keyroll.db 内存储** | 单文件备份最简单，SQLite 事务保证一致性 |
| **inner 记录类型** | 区分系统内部数据与用户数据，凭证记录不使用 MasterKey 加密 |
| **多密钥加密同一 MasterKey** | 支持多种登录方式，灵活性优先于最小化攻击面 |
| **每个密钥独立 salt** | 防止彩虹表攻击 |
| **AES-GCM 统一算法** | authTag 同时完成解密和验证，无需独立 hash 字段 |

### 数据结构

凭证以 inner 记录形式存储在 `records` 表中：

| 记录 key | recordValue (JSON) |
|----------|-------------------|
| `/inner/system.authn/password` | `{ "passwordSalt": "<base64>", "masterKeySecret": "<base64>" }` |
| `/inner/system.authn/recovery` | `{ "recoverySeed": "<base64>", "masterKeySecret": "<base64>" }` |

### RecoveryCode 说明

- 格式：4 位一组，共 5 组，大写 + 连字符（如 `A1B2-C3D4-E5F6-G7H8-I9J0`）
- 使用 scrypt 从 RecoveryCode + recoverySeed 派生加密密钥
- 用户需要保存 RecoveryCode 和 keyroll.db 文件备份

### Password 说明

- 格式：6-16 位数字
- 使用 scrypt 从 Password + passwordSalt 派生加密密钥
- 登录机制：服务端用 Password + passwordSalt 派生密钥，尝试解密 `masterKeySecret`，AES-GCM authTag 验证通过即认证成功
- 速率限制：5 次尝试/15 分钟

---

## 加密策略

采用字段级加密，不对整个数据库文件加密。详细算法参数和密钥层次参见 [数据模型文档](../apispecs/model.md#加密设计)。

### 安全等级 (secureLevel)

secureLevel 与 recordType 正交：

| recordType \ secureLevel | 0 = Unmanaged | 1 = Protected |
|--------------------------|---------------|---------------|
| `0` inner | 自有秘密保管策略 | — |
| `1` plain | recordValue 不加密 | recordValue 使用 MasterKey 加密 |
| `2` refer | recordValue 不加密 | 仅 blob 本体加密 |
| `3` graph | JSON 不加密 | — |

注："—" 表示该组合无效。

---

## 会话管理

| 特性 | 说明 |
|------|------|
| Token 格式 | 随机 UUID v4 |
| Token 存储 | 仅浏览器内存（不写入 Storage） |
| Token 有效期 | 30 分钟无活动自动过期 |
| 超时检测 | 客户端检测 visibilitychange 事件 |
| 认证中间件 | 服务端验证 Token 是否存在于内存会话表 |

### API 访问控制

| API | 认证要求 |
|-----|----------|
| `/api/authn/password/*` | 豁免（内部有独立的 AES-GCM 验证） |
| `/api/authn/recovery/*` | 豁免（内部有独立的解密验证） |
| `/api/authn/sessions/*` | 需要 BearerToken |
| 其他 API | 需要 BearerToken |

**注意**：`/api/authn/password/create` 在系统未初始化时无需认证，系统已初始化时需要 BearerToken

---

## 开放问题

**数据备份**：keyroll.db 的云备份机制参见 [数据备份设计](../features/data-backup.md)。
