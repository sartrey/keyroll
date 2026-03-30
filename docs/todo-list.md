# 待办任务列表

记录未完成但值得跟进的任务，按时间倒序排列，定期清理过期任务。

## 任务列表

### 任务格式

- [ ] **任务标题** - YYYY-MM-DD
  任务描述

### 当前任务

- [ ] **修复凭证文件删除恢复的安全漏洞** - 2026-03-30
  **问题**：攻击者删除 `credentials.json` 后，用户用 RecoveryCode 恢复时，系统无法验证密码是否被恶意重置。恢复后的密码可以登录，但无法解密 MasterKey 加密的数据（相当于登录密码无用）。

  **方案**：在 `keyroll.db` 中添加系统保留记录 `/system/auth/password_verifier`，与登录密码建立可验证联系。验证流程：
  1. 初始化时：用 password 派生 verifier 存入数据库（与 MasterKey 一起加密）
  2. 登录时：计算输入密码的 verifier，与数据库比对
  3. 不匹配则说明 credentials.json 可能被恶意重置，拒绝登录

  涉及修改：
  - 新增 `PasswordVerifier` 服务
  - `credential-manager` 集成 verifier 验证
  - 更新初始化/恢复流程

- [ ] **实现 RecoveryCode 恢复入口** - 2026-03-30
  登录页面需要提供"使用恢复码"选项，包括 UI 和 /authn/recovery/verify API 集成

- [ ] **实现 Password 修改功能** - 2026-03-30
  已登录用户可以在设置页面修改 Password，服务端 API 已支持

- [ ] **实现 Password 输入 UI** - 2026-03-30
  已登录后，如果需要访问加密数据，需要输入 Password 解密 MasterKey

- [ ] **修复 Passkey 认证功能** - 2026-03-30
  Passkey 注册/登录流程不工作，需要检查：1) Passkey 是否正确保存到 credentials.json 2) Passkey 登录是否正确验证签名 3) Passkey 注册后 Password 登录能力是否正确禁用

### 已完成任务

- [x] ~~按设计文档修复 API 路由~~ - 2026-03-30
  删除 /authn/initiate API，恢复 /authn/password/verify 和 /authn/password/create 路由，初始化流程改为组合原子 API（/password/create → /password/verify）

- [x] ~~实现 Web 认证 UI（登录页面和初始化引导）~~ - 2026-03-30
