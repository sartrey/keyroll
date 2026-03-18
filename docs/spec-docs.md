# 文档规范

## 文档结构

```
keyroll/
├── docs/
│   ├── roadmap.md          # 产品路线图和特性状态
│   ├── features/           # 功能特性设计
│   │   └── auth-security.md  # 用户认证与安全
│   ├── spec-api.md         # API 设计规范
│   ├── spec-web.md         # Web UI 设计规范
│   ├── spec-cli.md         # CLI 设计规范
│   ├── architecture.md     # 系统架构设计
│   ├── data-model.md       # 数据模型设计
│   ├── dev-guide.md        # 开发指南
│   └── spec-docs.md        # 本文档规范
├── logs/                   # 开发日志
│   └── yyyy-MM-dd.md       # 按日期记录开发过程
└── AGENTS.md               # 产品概要和工作方法
```

## 文档职责

### AGENTS.md
- **内容**: 产品概要、工作方法
- **原则**: 保持简洁，不记录具体信息
- **更新**: 仅在工作方法变更时更新

### docs/roadmap.md
- **内容**: 产品路线图和特性实现状态
- **包含**: 各阶段特性列表、实现状态标记、开放问题

### docs/features/
- **内容**: 功能特性设计文档
- **包含**: 用户认证、安全机制等核心功能
- **命名**: `<feature-name>.md`

### docs/spec-api.md
- **内容**: API 设计规范
- **包含**: 端点定义、请求/响应格式、错误处理

### docs/spec-web.md
- **内容**: Web UI/UX 设计规范
- **包含**: 页面布局、组件设计、交互流程

### docs/spec-cli.md
- **内容**: CLI 设计规范
- **包含**: 命令列表、输出规范、使用示例

### docs/architecture.md
- **内容**: 系统架构设计
- **包含**: 技术栈、模块划分、数据流

### docs/data-model.md
- **内容**: 数据模型和类型定义
- **包含**: 核心概念、字段定义、数据库表结构、TypeScript 类型
- **用途**: `src/shared/` 目录的参考来源

### docs/dev-guide.md
- **内容**: 开发流程指南
- **包含**: 快速命令、代码规范、调试技巧

### logs/yyyy-MM-dd.md
- **内容**: 每日开发日志
- **格式**:
  ```markdown
  # 开发日志 - yyyy-MM-dd

  ## 今日任务

  ### 任务名称
  - **时间**: 上午/下午
  - **内容**: 具体工作内容
  - **结果**: 完成/进行中/阻塞

  ## 遇到的问题

  ## 明日计划
  ```

## 文档维护原则

1. **日志每日更新**: 每个开发日创建对应的日志文件
2. **路线图及时同步**: 完成特性后更新 `roadmap.md` 状态
3. **数据模型与代码同步**: 类型变更时同步更新 `data-model.md` 和 `src/shared/`
4. **特性文档独立**: 每个核心功能特性在 `features/` 下独立成文
5. **规范文档分类**: API、Web、CLI 规范使用 `spec-*` 命名，架构和数据模型文档直接在 `docs/` 根目录

## 命名约定

- 日志文件：`yyyy-MM-dd.md`（如 `2026-03-18.md`）
- 规范文档：使用 `spec-*` 前缀（如 `spec-api.md`、`spec-web.md`、`spec-cli.md`）
- 设计文档：使用简短名称（如 `architecture.md`、`data-model.md`）
- 特性文档：使用短横线分隔（如 `auth-security.md`）
