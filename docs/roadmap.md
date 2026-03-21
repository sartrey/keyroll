# 产品路线图

**Keyroll** 是一个 single-user、local-first 的个人数据存储系统。

核心目标：提供一个简单、可靠的数据存储层，让开发者可以轻松地以结构化方式存储和管理个人数据。

---

## 产品特性列表

### Phase 1 - 认证基础设施

| 特性 | 状态 | 说明 |
|------|------|------|
| credentials.json 数据结构 | 🔴 未实现 | passkeys 数组 + recovery 对象 + password 对象 |
| 系统初始化检测 | 🔴 未实现 | 已初始化/未初始化状态 |
| MasterKey 生成（随机 256 位） | 🔴 未实现 | 用户唯一对称加密密钥 |
| RecoveryCode 生成 | 🔴 未实现 | 4 位一组共 5 组，大写连字符 |
| Password 验证 | 🔴 未实现 | 6 位数字，速率限制 5 次/15 分钟 |
| scrypt 密钥派生 | 🔴 未实现 | password + passwordSalt 和 RecoveryCode + recoverySeed |
| MasterKey 加密/解密 | 🔴 未实现 | AES-256-GCM |

### Phase 2 - Passkey 管理

| 特性 | 状态 | 说明 |
|------|------|------|
| WebAuthn 注册 | 🔴 未实现 | `navigator.credentials.create()` |
| Passkey 添加流程 | 🔴 未实现 | 初始化时自动注册 |
| 多 Passkey 支持 | 🔴 未实现 | 每个 passkey 独立存储公钥 |
| Passkey 移除 | 🔴 未实现 | 撤销设备 |

### Phase 3 - Passkey 认证

| 特性 | 状态 | 说明 |
|------|------|------|
| WebAuthn 认证 | 🔴 未实现 | `navigator.credentials.get()` |
| ES256 签名验证 | 🔴 未实现 | 服务端验证 Passkey 签名 |
| counter 更新 | 🔴 未实现 | 检测凭证克隆 |
| AccessToken 颁发 | 🔴 未实现 | Passkey 认证成功后 |

### Phase 4 - RecoveryCode 恢复

| 特性 | 状态 | 说明 |
|------|------|------|
| RecoveryCode 验证 | 🔴 未实现 | 输入 RecoveryCode → 派生密钥 → 解密 MasterKey |
| 速率限制 | 🔴 未实现 | 最多 5 次/15 分钟 |
| Password 重设 | 🔴 未实现 | RecoveryCode 验证后重设 Password |

### Phase 5 - 会话管理

| 特性 | 状态 | 说明 |
|------|------|------|
| BearerToken 生成 | 🔴 未实现 | 随机 UUID v4 |
| 内存会话表 | 🔴 未实现 | Map 存储 Token 和活动时间 |
| BearerToken 认证中间件 | 🔴 未实现 | API 请求认证 |
| visibility 超时登出 | 🔴 未实现 | 30 分钟自动登出 |
| 登录页面 UI | 🔴 未实现 | 支持 Passkey 登录 |
| Password 输入 UI | 🔴 未实现 | 用于 MasterKey 解密 |

### Phase 6 - 加密存储

| 特性 | 状态 | 说明 |
|------|------|------|
| secureLevel 0 存储 | 🔴 未实现 | 明文，仅认证 |
| secureLevel 1 加密存储 | 🔴 未实现 | MasterKey 加密，AES-256-GCM |
| secureLevel 2 全程加密 | 🔴 未实现 | MasterKey 加密 + Refer 外部数据加密 |
| record 级别加密/解密 API | 🔴 未实现 | 加密数据存储和访问 |

### Phase 7 - 本地 RP 识别（可选）

| 特性 | 状态 | 说明 |
|------|------|------|
| TLS 证书指纹绑定 | 🔴 未实现 | 本地 RP 识别增强 |
| 远端验证服务 | 🔴 未实现 | 增值服务 |

### 已完成功能

| 特性 | 状态 | 说明 |
|------|------|------|
| 字段重命名：添加 record 前缀 | 🟢 已完成 | 字段统一使用 record 前缀 |
| 主键使用 record_key | 🟢 已完成 | 支持高效前缀匹配查询 |
| record_type 使用 TINYINT | 🟢 已完成 | 0=plain, 1=refer |

---

## 开放问题

以下问题待解决：

1. **Key 校验**: 是否需要严格的 key 格式校验规则？
2. **contentType 枚举**: 是否预定义允许的 contentType 列表？
3. **refer 的 recordValue 格式**: 直接存储目标 key 字符串，还是 JSON 对象？
4. **域注册表访问点**: 线上发布的具体形式？（静态 JSON / API / 其他）
5. **数据备份**: recovery 数据的云备份机制参见 [data-backup.md](features/data-backup.md)
6. **本地 RP 认证**: 远端验证方案参见 [rp-attestation.md](features/rp-attestation.md)

---

## 图例说明

| 状态 | 说明 |
|------|------|
| 🟢 已完成 | 功能已实现并可用 |
| 🟡 进行中 | 功能开发中 |
| 🔴 未实现 | 功能待实现 |
