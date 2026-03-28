# 待办任务列表

记录未完成但值得跟进的任务，按时间倒序排列，定期清理过期任务。

## 任务列表

### 任务格式

- [ ] **任务标题** - YYYY-MM-DD
  任务描述

### 当前任务

- [ ] **实现完整的 WebAuthn 验证逻辑** - 2026-03-28
  Passkey 创建和验证端点中需要实现完整的 WebAuthn 签名验证（ES256 算法），目前仅实现了挑战生成和基础框架

- [ ] **实现 Passkey 登录 UI** - 2026-03-28
  创建 Web 登录页面，支持 Passkey 和 Password 两种登录方式

- [ ] **实现 Password 输入 UI** - 2026-03-28
  已登录后，如果需要访问加密数据，需要输入 Password 解密 MasterKey

### 已完成任务

- [x] ~~代码风格统一（2026-03-28）~~
  完成 server 目录重组（controllers/middlewares/services）、kebab-case 命名、nanoid 集成、UserDataDir 统一初始化

- [x] ~~实现认证系统完整功能~~ - 2026-03-28
  已完成加密模块、Credentials 管理、认证中间件、会话管理、Password API、RecoveryCode API、Passkey API、启动自检和 CLI init 命令

- [x] ~~更新认证 API 设计文档（v8.0）~~ - 2026-03-28
  已完成，主要变更：删除 /authn/initiate API，改为服务端启动自检；新增 GET /authn/status 端点；明确 Password 登录能力规则

- [x] ~~调整 Password API 设计（合并端点，添加 usageType）~~ - 2026-03-22
  已完成，/authn/password/login 和 /authn/password/verify 合并为 /authn/password/verify，/authn/password/reset 改名为 /authn/password/update

- [x] ~~调整 Passkey API 设计（合并端点，简化命名）~~ - 2026-03-22
  已完成，/authn/passkeys/register 和 complete 合并为 create，/authn/passkeys/authenticate 和 verify 合并为 verify，remove 改名为 delete

- [x] ~~设计认证 API 详细规范（Passkey + Password 职责分离）~~ - 2026-03-22
  已完成，文档见 `docs/apispecs/authn.md`

- [x] ~~更新用户认证与安全文档~~ - 2026-03-22
  已完成，文档见 `docs/features/auth-security.md`

- [x] ~~设计本地 RP 不可伪造的区分识别方法~~ - 2026-03-22
  已完成分析，结论：仅靠本地技术无法防止 RP 伪造，需远端验证

- [x] ~~创建 RP 远端认证产品特性文档~~ - 2026-03-22
  已完成，文档见 `docs/features/rp-attestation.md`
