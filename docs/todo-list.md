# 待办任务列表

记录未完成但值得跟进的任务，按时间倒序排列，定期清理过期任务。

## 任务列表

### 任务格式

- [ ] **任务标题** - YYYY-MM-DD
  任务描述

### 当前任务

- [ ] **实现认证 API 完整流程** - 2026-03-22
  根据 authn.md 实现初始化、Passkey 创建/删除/验证、Password 验证、RecoveryCode 恢复、Password 更新的完整 API

- [ ] **实现 Passkey 注册和认证** - 2026-03-22
  实现 WebAuthn 创建和验证流程，统一 /authn/passkeys/verify 端点通过 challengeId 判断阶段

- [ ] **实现 MasterKey 加密解密** - 2026-03-22
  使用 AES-256-GCM 加密 MasterKey，Password 通过 usageType 派生不同密钥（signin 用于登录，master 用于解密）

- [ ] **实现 TLS 证书生成和管理** - 2026-03-22
  服务端启动时生成自签名证书，展示证书指纹供用户验证

### 历史任务

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
