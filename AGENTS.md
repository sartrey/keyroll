# Keyroll Engineering Guide

## 项目概览

**Keyroll** 是一个 single-user、local-first 的个人数据存储系统。

核心目标：提供一个简单、可靠的数据存储层，让开发者可以轻松地以结构化方式存储和管理个人数据。

## 文档导航

| 文档 | 说明 |
|------|------|
| [产品设计](docs/product-design.md) | 产品定位、核心概念、数据模型、API 设计 |
| [架构设计](docs/architecture.md) | 系统架构、技术栈、模块划分 |
| [API 规范](docs/api-spec.md) | REST API 接口定义 |
| [开发指南](docs/dev-guide.md) | 开发流程、代码规范、调试技巧 |

## 核心概念速查

### Record 字段
| 字段 | 说明 |
|------|------|
| `recordKey` | 路径式 URN: `/<type>/<domain>/<namespace>/<name>` |
| `recordType` | `plain` (朴素值) 或 `refer` (引用) |
| `recordValue` | 存储内容（字符串） |
| `contentType` | 内容类型（不含编码） |
| `secureLevel` | 安全等级 (0/1/2) |

### Key 格式示例
```
/plain/localhost/user.profile/name
/refer/github.com/user.repo/main
```

### 域（Domain）
| 域 | 用途 |
|------|------|
| `localhost` | 本地私有数据 |
| 其他域名 | 对应第三方服务相关数据 |

## 任务执行流程

**每次开启新的独立任务时，请遵循以下流程：**

1. **阅读 AGENTS.md**：获取项目基本理解
2. **按需查阅文档**：
   - 产品设计 → `product-design.md`
   - 架构/数据模型 → `architecture.md`
   - API 开发 → `api-spec.md`
   - 开发流程 → `dev-guide.md`
3. **遵守约束**：严格执行文档中定义的技术约束和设计方案
4. **维护文档**：发现设计与实际不一致时，及时修正文档或代码

## 知识管理原则

> 本文档和 `docs/` 目录是持续维护的工程知识库。

- AGENTS.md 保持简洁，只保留指引性内容
- docs/ 维护详细的技术文档
- 保持文档与代码同步是开发流程的一部分

## 快速命令

```bash
# 开发
npm run dev

# 构建
npm run build

# 生产
npm start

# CLI
npm run cli -- <command>
```
