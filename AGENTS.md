# Keyroll 产品概要

**Keyroll** 是一个 single-user、local-first 的个人数据存储系统。

核心目标：提供一个简单、可靠的数据存储层，让开发者可以轻松地以结构化方式存储和管理个人数据。

**核心概念参见**: [数据模型](docs/data-model.md)

## 文档导航

- [产品路线图](docs/roadmap.md)
- [功能特性](docs/features/)
  - [用户认证与安全](docs/features/auth-security.md)
  - [RP 证明](docs/features/rp-attestation.md)
- [设计规范](docs/)
  - [文档规范](docs/spec-docs.md)
  - [API 规范](docs/spec-api.md)
    - [认证 API](docs/apispecs/authn.md)
    - [数据 API](docs/apispecs/model.md)
  - [Web 规范](docs/spec-web.md)
  - [CLI 规范](docs/spec-cli.md)
- [架构设计](docs/architecture.md)
- [数据模型](docs/data-model.md)
- [开发指南](docs/dev-guide.md)
- [待办任务](docs/todo-list.md)

---

# 工作方法

## 任务执行流程

**每次启动任务时，请遵循以下流程：**

1. **阅读 AGENTS.md**：获取产品概要和工作方法
2. **查看待办任务**：阅读 `docs/todo-list.md` 了解未完成的任务
3. **按需查阅文档**：
   - 产品路线 → `docs/roadmap.md`
   - 功能特性 → `docs/features/`
   - 规范文档 → `docs/spec-*.md`（API/Web/CLI）
   - 设计文档 → `docs/architecture.md`、`docs/data-model.md`
   - 开发规范 → `docs/dev-guide.md`
4. **遵守约束**：严格执行文档中定义的技术约束和设计方案
5. **更新记录**：
   - 在 `docs/todo-list.md` 记录新增任务或标记完成任务
   - 在 `docs/roadmap.md` 更新特性实现状态
   - 涉及设计变更时同步更新对应文档

## 代码变更检查

**每次修改源代码后必须执行：**

1. **运行 ESLint**：`npm run lint` 检查代码质量
2. **修复错误**：所有 error 必须修复
3. **处理 warning**：
   - warning 可以不处理，但需要反思为什么存在该 warning
   - 将未处理的 warning 记录在待解决问题列表中，后续评估是否需要修复
4. **更新规范**：如果需要新增或修改 ESLint 规则，必须先与用户确认

## 文档维护原则

- **AGENTS.md** 保持简洁，只保留指引性内容
- **docs/** 维护详细的专业技术文档
- **docs/todo-list.md** 记录待完成的重要任务，按时间倒序排列
- 定期清理 `docs/todo-list.md` 中过期较久的任务
- 保持文档与代码同步是开发流程的一部分
