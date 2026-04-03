# 数据模型设计决策记录

**日期**: 2026-04-07
**主题**: 数据模型（recordType、secureLevel、凭证存储、refer 结构）的演进

---

## 决策一：增加 inner 记录类型

### 初始方案

凭证存储在独立的 `credentials.json` 文件中，与 `keyroll.db` 分离。

**原始理由**：避免"读取凭证 → 需解密数据库 → 需 MasterKey → 需先验证凭证"的死循环。

### 发现的问题

- **备份不便**：用户需要备份两个文件（credentials.json + keyroll.db），遗漏任一都会导致恢复失败
- **文件一致性**：两个文件需要手动保持同步，SQLite 的事务保证无法覆盖独立 JSON 文件
- **单文件备份是最简单的**：用户只需要复制一个文件

### 决策：凭证存储在主数据文件中

将凭证迁移到 `keyroll.db`，增加第三种记录类型 `inner`，专用于系统内部信息存储。

**打破死循环的方法**：inner 凭证记录**不使用 MasterKey 加密**，而是用各自的派生密钥（Password 或 RecoveryCode + salt）自加密。

启动时：打开 SQLite（无需密钥）→ 读取 inner 凭证记录 → 用 Password/RecoveryCode 派生密钥解密 → 得到 MasterKey → 内存持有。

同时这一决策带来另一个设计约束：**数据文件整体不能加密**。原因有两个：
1. 凭证存储要求：凭证用于获取 MasterKey，如果整个数据库文件被加密，读取凭证就需要先有 MasterKey
2. 文件安全要求：文件级加密在频繁读写期间有损坏风险，破坏 SQLite 的原子提交保证

两个推理链收敛于同一个结论：**数据文件整体不加密，必要时设计单列加密**。

---

## 决策二：增加 graph 记录类型

### 背景

在 inner、plain、refer 之外，需要一种记录来描述复杂的记录间逻辑指向关系。

### 决策

增加 `graph` 记录类型（值为 3），value 是对 DAG（有向无环图）的目标和过程的描述。secureLevel 只能为 0（Unmanaged），JSON 不加密，明文存储。

---

## 决策三：secureLevel 正交化

### 初始方案

secureLevel 有三个枚举值：Unmanaged（0）、Proximal（1）、Full-chain（2），对所有 recordType 统一语义。

### 发现的问题

secureLevel 与 recordType 的表达不够正交。对于 inner 记录，一定有自己的秘密保管策略和算法，相当于 secureLevel = 0（Unmanaged）。对于不同类型的记录，"加密"的含义完全不同——plain 是 value 本身加密，refer 是 blob 加密。统一枚举无法准确表达这些差异。

### 决策：secureLevel 简化为两个值

| 等级 | 名称 | 含义 |
|------|------|------|
| `0` | Unmanaged（未托管） | 数据不由 MasterKey 管理，加密策略由记录自身决定 |
| `1` | Protected（受保护） | 数据由 MasterKey 加密保护 |

同时定义 **recordType × secureLevel 正交矩阵**，每种组合的具体加密行为由 recordType 决定：

| recordType \ secureLevel | 0 = Unmanaged | 1 = Protected |
|--------------------------|---------------|---------------|
| `0` inner | 自有秘密保管策略 | — |
| `1` plain | recordValue 不加密 | recordValue 使用 MasterKey 加密 |
| `2` refer | recordValue 不加密 | 仅 blob 本体加密 |
| `3` graph | JSON 不加密 | — |

---

## 决策四：Refer 记录结构演进

### 初始方案

refer 的 recordValue 直接存储字符串 URN，表示对外部文件的引用。

### 第一次演进：JSON 结构

发现需要更多元数据，改为 JSON 对象，包含多个字段。

### 第二次演进：简化为 originSrc + integrity

发现之前的结构中 `target` 和 `encryptedPath` 字段没有实际用途，`integrity` 本身就是 blobs 目录里加密后文件的文件名。

最终结构简化为：

```json
{
  "originSrc": "/path/to/original/file.jpg",
  "integrity": "sha256-<base64hash>"
}
```

| 字段 | 说明 |
|------|------|
| `originSrc` | 原始文件路径，用于恢复时还原文件名和扩展名 |
| `integrity` | SRI 格式完整性校验值，同时承担三重职责：完整性校验、HKDF 密钥派生盐、blob 文件名 |

refer 的 recordKey 是树状语义索引路径，按域和子域分类后语义化命名（如 `image/1`、`audio/1`、`video/1`），不记录原始文件名。

---

## 决策五：Blob 加密策略

### 问题

如果所有 blob 使用同一个 MasterKey 加密，一旦 MasterKey 泄露，所有 blob 密文均可被解密。

### 决策：Per-blob HKDF 密钥派生

每个 blob 使用 `HKDF(MasterKey, integrity_hash)` 派生独立密钥，避免密文共享。

### 大文件处理

将大文件复制到 blobs 目录再加密会带来显著的 I/O 开销。决策：

- **小文件（≤4MB）**：复制到 blobs 目录后加密
- **大文件（>4MB）**：原地加密，blobs 目录创建软链指向密文文件

---

## 决策六：凭证命名路径

### 变更

系统内部路径从 `system.auth` 改为 `system.authn`，以与将来可能的 `authz`（授权）区分。

最终凭证记录 key：
- `/inner/system.authn/password`
- `/inner/system.authn/recovery`
