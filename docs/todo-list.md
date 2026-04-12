# 待办任务列表

记录未完成但值得跟进的任务，按时间倒序排列，定期清理过期任务。

## 任务列表

### 任务格式

- [ ] **任务标题** - YYYY-MM-DD
  任务描述

### 当前任务

- [ ] **数据创建体验优化** - 2026-04-07
  优化 Database 页的数据创建交互。当前使用 Modal + 表单的方式较简陋，需要：
  - 更友好的 Key 输入（自动补全前缀、格式校验提示）
  - 记录值编辑器根据 contentType 切换（文本 / JSON / 其他）
  - 创建后自动刷新列表并高亮新记录

- [ ] **新增数据结构类型支持** - 2026-04-07
  当前仅 plain 类型基本可用，需要设计并实现其他数据结构的 CRUD 支持：
  - **refer** — 引用类型，recordValue 为 JSON 格式 `{ originSrc, integrity }`，支持引用关系展示
  - **graph** — 图谱类型，recordValue 为 JSON 格式的节点/边数据
  - 在 Database 页为不同类型提供差异化的创建和编辑界面

- [ ] **Refer 文件选择器（Server 辅助）**
  当前 refer 记录本地路径只能手动输入。未来计划：server 端提供目录浏览和导航 API，web 侧通过选择器浏览本地文件系统并获取路径，server 验证文件存在性并反馈。

- [ ] **secureLevel 加密逻辑实现** - 2026-04-07
  当前 secureLevel 字段存在但未实现实际的加密/解密逻辑。需要：
  - secureLevel=1 时自动使用 MasterKey 加密 recordValue
  - secureLevel=0 时明文存储
  - 读取时自动解密

### 已完成任务

- [x] ~~优化 Refer 记录创建体验~~ - 2026-04-12
  - 新增 Blob 服务（`src/server/services/blob.ts`），支持文件 integrity 计算和 blobs 目录存储
  - create 端点自动处理本地文件路径 refer 记录，自动计算 integrity
  - 新增 `POST /model/records/sync-refer` 端点，支持下载远程 URL 文件到本地
  - 前端 refer 创建 UI：
    - 远程 URL 模式 — 输入 URL + 可选 Integrity
    - 本地文件模式 — 文件选择器（`<input type="file">`），显示文件名和大小
  - 列表操作栏为远程 refer 记录添加"同步到本地"按钮
  - 同步记录的 key 规则：`源key/sync`

- [x] ~~优化数据创建体验~~ - 2026-04-12
  - Key 输入拆分为不可编辑的类型前缀（addonBefore）+ 可编辑的后缀路径
  - 安全等级选择器从 Select 改为 Radio.Group 大按钮样式，带图标和说明文字
  - 安全等级移到值输入框前面

- [x] ~~统一 API 响应格式~~ - 2026-04-12
  model 控制器所有端点对齐到 spec-api.md 定义的统一格式：
  - 成功响应统一为 `{ traceId, content }`
  - 失败响应统一为 `{ traceId, errorId, content }`
  - errorId 使用 PascalCase（RecordNotFound、InvalidRecordType、InvalidRecordKey、InvalidRequest）

- [x] ~~将凭证从 credentials.json 迁移到 keyroll.db~~ - 2026-04-07
  凭证现在存储在 keyroll.db 的 inner 记录中（`/inner/system.authn/password`、`/inner/system.authn/recovery`）。
  - credential-manager 改为读写 inner 记录
  - server 启动自检改为从数据库加载凭证
  - CLI `keyroll setup` 改为调用 API 初始化

- [x] ~~实现 RecoveryCode 恢复入口~~ - 2026-04-07
  登录页面添加"使用恢复码恢复"选项，包含恢复码验证和重设密码的完整 UI 流程。

- [x] ~~实现 Password 修改功能~~ - 2026-04-07
  设置页面添加修改密码按钮和弹窗，调用 `/authn/password/update` API。

- [x] ~~修复 API 路由~~ - 2026-03-30
  删除 /authn/initiate API，恢复 /authn/password/verify 和 /authn/password/create 路由，初始化流程改为组合原子 API（/password/create → /password/verify）

- [x] ~~实现 Web 认证 UI（登录页面和初始化引导）~~ - 2026-03-30
