# 认证机制设计决策记录

**日期**: 2026-04-07
**主题**: 从 Passkey 到 Password-only 的认证方案演进

---

## 背景

Keyroll 是一个 single-user、local-first 的个人数据存储系统，需要设计本地认证机制。本文档记录设计过程中的试错、验证和最终决策。

---

## 决策一：放弃 Passkey 本地认证

### 初始方案

最初计划使用 WebAuthn Passkey 作为主要登录方式，Password（6 位数字）作为备用。理由：
- Passkey 是 WebAuthn 标准，体验好，无需记忆密码
- 设备原生支持（Touch ID / Face ID / Windows Hello）

### 发现的问题

**核心问题：Passkey 无法托管 MasterKey 解密密钥**。

在本地场景中，Passkey 仅能完成身份认证（签名验证），但无法存储用于解密 MasterKey 的密钥——这需要 WebAuthn 的 `largeBlob` 扩展支持，而该扩展不具备实用性（详见下方补充验证）。

这导致 Passkey 只能用于登录认证，与 MasterKey 解密完全脱节。如果要同时实现登录和解密，需要两套独立的认证流程：Passkey 登录 + Pin Code 二次认证解密密钥。

**衍生问题：本地 RP 无法自证**。

Passkey 的身份认证依赖 RP 身份的可信性。在本地运行环境中：
- 任何本地服务都可以监听相同端口（如 3000）
- 可以生成自签名证书
- 可以声称相同的 RP ID（如 `localhost`）
- 用户无法区分哪个服务是真正的 keyroll

攻击者可以轻松部署伪造服务实现 Passkey 登录认证，而 Passkey 本身无法提供比 Password 更高的安全保障——因为 Passkey 不能存储 MasterKey 解密密钥，攻击者伪造服务获得 Passkey 认证后同样可以访问用户数据。引入 Passkey 后，认证链路变长，安全性不增反降。

### 考虑的补救方案：SAE 代码签名

尝试通过 SAE（Self-Attested Execution）打包和代码签名来解决 RP 信任问题：
- 将 Node.js 运行时与应用代码打包为可签名单元
- 使用 macOS codesign / Windows SignTool 签名
- 配合操作系统级凭证存储（Keychain / Credential Manager）

**放弃原因**：
- 复杂度陡增，需要打包和签名基础设施
- 代码签名只能证明代码来源，不能在用户面对 Web UI 时证明 RP 身份
- 偏离了 local-first 简单直接的产品定位
- 需要先完成认证机制本身才能做 SAE，形成依赖循环

### 补充验证：Passkey largeBlob 能力不具备实用性

Passkey 无法托管 MasterKey 解密密钥是放弃 Passkey 认证的关键原因。如果 Passkey 能够存储加密后的 MasterKey（通过 largeBlob 扩展），理论上可以实现"Passkey 自携带 MasterKey"，解决认证与解密脱节的问题。

**largeBlob 不可用的原因**：
- 浏览器支持不完整，各大平台实现差异大
- 存储空间极有限（通常仅几百字节到数 KB）
- 跨平台兼容性差，同一 Passkey 在不同设备行为不一致
- WebAuthn 标准中 largeBlob 本身仍处于扩展阶段，非规范必选项

**结论**：largeBlob 的不成熟意味着 Passkey 无法实现"认证+解密"一体化，只能做独立的登录认证。结合本地 RP 无法自证的问题，引入 Passkey 后需要额外设计 Pin 二次认证来解出 MasterKey，认证链路变长但安全性并未提升。

### 最终决策

**完全放弃 Passkey 本地认证**，采用 Password-only 方案：
- 6 位数字密码，scrypt 派生密钥，AES-GCM authTag 验证
- Password 一次输入同时完成身份认证和 MasterKey 解密，认证链路最短
- 不依赖 RP 身份可信，认证安全完全由密钥派生和加密算法保证
- 简化实现，去掉 Passkey 相关的所有 API、数据结构、UI

---

## 决策二：RP 远端认证转为长期规划

### 初始方案

为弥补本地 RP 无法自证的问题，设计了远端认证（Remote Attestation）机制：
- 服务启动时向远端验证服务器注册
- 获取由远端签名的服务凭证
- 客户端验证远端签名确认服务合法性

### 调整原因

- 本地 RP 认证若依赖远端验证，等价于需要一个中心化的 keyroll 密钥分发服务
- 该服务的建设成本和维护成本远高于预期，属于中心化基础设施
- 当前阶段应专注于本地单用户存储体验的打磨，而非远端服务

### 如果要做：本地 OAuth 获取远端认证传递

如果将来需要远端认证，方案不会是自建验证服务器签名，而是通过 **OAuth 协议**让本地 RP 从远端 keyroll 服务获取认证传递：
- 用户在远端 keyroll 服务完成认证
- 本地 RP 通过 OAuth 流程接收认证结果
- 远端服务作为可信的身份提供者（Identity Provider），本地 RP 作为客户端（Client）
- 无需自行设计凭证签名机制，OAuth 的授权码流程天然解决 RP 信任问题

但这一方案的前提是存在一个运行中的远端 keyroll 服务，属于中心化的基础设施投入。

### 最终决策

**降级为长期规划**，不再从当前特性列表中移除。如果将来本地存储实现得足够成熟，需要多设备同步或远端服务信任体系时，会启动中心化密钥分发服务的设计。

---

## 决策三：认证方案定稿

### 最终方案

| 凭证 | 用途 | 说明 |
|------|------|------|
| **Password** | 登录认证 + MasterKey 解密 | 6-16 位数字密码，登录时直接解密 masterKeySecret |
| **RecoveryCode** | 紧急恢复 | 最终恢复手段，用于重设 Password |

### 核心设计原则

1. **Password 是唯一登录方式**，始终可用
2. **登录即解密**：Password 登录时通过 scrypt + AES-GCM authTag 验证，同时完成 MasterKey 解密
3. **无 passwordHash**：直接用 AES-GCM authTag 验证，无需独立哈希字段
4. **RecoveryCode 是最终恢复手段**：5 组 4 位大写字符，scrypt 派生密钥
5. **初始化是启动自检**：服务端启动时打开 keyroll.db 检查 inner 凭证记录

### 被移除的内容

以下内容已从代码和设计文档中移除：
- Passkey 注册/登录 API（`/authn/passkeys/*`）
- Passkey 数据结构（已从 inner 凭证设计中移除）
- WebAuthn 签名验证逻辑
- Passkey 与 Password 的联动逻辑（注册 Passkey 禁用 Password 登录）
- SAE 打包和代码签名任务
- RP Attestation 特性文档
- `passkeysExist` / `passwordLoginAvailable` 等状态字段

---

## 决策四：凭证存储从 credentials.json 迁移到 keyroll.db

### 初始方案

`credentials.json` 独立文件存储凭证（recoverySalt + masterKeySecret、passwordSalt + masterKeySecret），与 `keyroll.db` 分离。

**原始理由**：避免"读取凭证 → 需解密数据库 → 需 MasterKey → 需先验证凭证"的死循环。

### 发现的问题

- **备份不便**：用户需要备份两个文件（credentials.json + keyroll.db），遗漏任一都会导致恢复失败
- **文件一致性**：两个文件需要手动保持同步，SQLite 的事务保证无法覆盖独立 JSON 文件
- **单文件备份是最简单的**：用户只需要复制一个文件

### 决策：凭证故意存储在主数据文件中

为了方便用户备份，**我们将凭证故意存储在 keyroll.db 主数据文件中**。这一决策同时带来另一个设计约束：

**数据文件整体不能加密**。

原因有两个，来自不同的推理链但结论一致：

1. **凭证存储要求**：凭证用于获取 MasterKey，如果整个数据库文件被加密，读取凭证就需要先有 MasterKey —— 回到"鸡和蛋"的死循环。因此数据文件必须整体可读取，凭证才能在没有 MasterKey 的情况下被访问。

2. **文件安全要求**：即使没有凭证问题，数据文件整体加密也会在频繁的读写操作期间带来损坏风险——写入中断可能导致整个数据库文件损坏，且破坏 SQLite 的原子提交保证。这一约束已在加密策略中确立。

两个推理链重叠收敛于同一个结论：**数据文件整体不加密，必要时设计单列加密**。

### 解决方案：增加 inner 记录类型 + 单列加密

在 `plain`、`refer` 以外增加第三种记录类型 `inner`，专用于系统内部信息存储。凭证数据以 inner 记录的形式存入 `keyroll.db`。

**如何打破死循环**：
- inner 凭证记录**不使用 MasterKey 加密**，而是用各自的派生密钥（Password 或 RecoveryCode + salt）自加密
- 启动时：打开 SQLite（无需密钥）→ 读取 inner 凭证记录 → 用 Password/RecoveryCode 派生密钥解密 → 得到 MasterKey → 内存持有
- 死循环被打破，因为读取凭证不需要 MasterKey

**数据加密策略**：
- 数据文件整体不加密（SQLite 原生格式，可用任意 SQLite 工具打开）
- secureLevel 与 recordType 正交，定义两种加密语义：
  - **Unmanaged (0)**：数据不由 MasterKey 管理，inner 和 graph 记录自有秘密保管策略
  - **Protected (1)**：数据由 MasterKey 加密保护
    - plain：recordValue 本身使用 MasterKey 加密
    - refer：仅 blob 本体加密，recordValue 中的 JSON 不加密
    - 每个 blob 使用 `HKDF(MasterKey, integrity_hash)` 派生独立密钥
    - `integrity` 字段三重职责：完整性校验 + 密钥派生盐 + blob 文件名
    - refer 记录 JSON 格式：`{ originSrc, integrity }`
    - 小文件密文存 blobs 目录，大文件原地加密 + 软链

**安全性分析**：
- 凭证 blob 本身已经是自加密的（scrypt 派生密钥），安全瓶颈在派生密钥而非存储位置
- 将凭证与加密数据放在同一文件中，不改变攻击面：攻击者仍然需要破解 6 位数字或 RecoveryCode
- 相比 credentials.json，SQLite 的原子提交保证反而提高了数据可靠性

### 最终决策

**将凭证迁移到 keyroll.db**，使用 inner 记录类型：
- 用户只需备份一个文件
- SQLite 事务保证凭证与数据的一致性
- 简化架构，消除双文件管理的复杂性

详细内容参见 [数据模型更新](apispecs/model.md#inner-record)。

---

## 参考

- 最终方案规范：[用户认证与安全](features/auth-security.md)
- API 规范：[认证 API](apispecs/authn.md)
- 待办任务：[todo-list](todo-list.md)
