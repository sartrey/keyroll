# Keyroll 产品概要

**Keyroll** 是一个 single-user、local-first 的个人数据存储系统。

核心目标：提供一个简单、可靠的数据存储层，让开发者可以轻松地以结构化方式存储和管理个人数据。

## 核心概念

| 概念 | 说明 |
|------|------|
| **Record** | 核心存储单元，包含 recordKey、recordType、recordValue 等字段 |
| **recordKey** | 路径式 URN: `/<type>/<domain>/<namespace>/<name>` |
| **recordType** | `plain` (朴素值) 或 `refer` (引用) |
| **Domain** | 作用域标识，如 `localhost`、`github.com` |

## 文档导航

| 文档 | 说明 |
|------|------|
| [产品路线图](docs/roadmap.md) | 产品特性和实现状态 |
| [功能特性](docs/features/) | 用户认证、安全等核心功能设计 |
| [设计规范](docs/spec-docs.md) | 文档结构和管理规范 |
| [API 规范](docs/spec-api.md) | API 设计文档 |
| [Web 规范](docs/spec-web.md) | Web UI 设计文档 |
| [CLI 规范](docs/spec-cli.md) | CLI 设计文档 |
| [架构设计](docs/architecture.md) | 系统架构设计 |
| [数据模型](docs/data-model.md) | 数据模型和类型定义 |
| [开发指南](docs/dev-guide.md) | 开发流程和代码规范 |
| [开发日志](logs/) | 每日开发记录 |

---

# 工作方法

## 任务执行流程

**每次启动任务时，请遵循以下流程：**

1. **阅读 AGENTS.md**：获取产品概要和工作方法
2. **按需查阅文档**：
   - 产品路线 → `docs/roadmap.md`
   - 功能特性 → `docs/features/`
   - 规范文档 → `docs/spec-*.md`（API/Web/CLI）
   - 设计文档 → `docs/architecture.md`、`docs/data-model.md`
   - 开发规范 → `docs/dev-guide.md`
3. **遵守约束**：严格执行文档中定义的技术约束和设计方案
4. **更新记录**：
   - 在 `logs/yyyy-MM-dd.md` 记录当日开发日志
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
- **logs/** 记录每日开发过程和决策
- 保持文档与代码同步是开发流程的一部分
