# 架构设计

## 系统概览

Keyroll 是一个 **local-first personal data storage** 系统，核心设计理念是单用户本地优先存储。

## 项目结构

```
keyroll/
├── src/
│   ├── server/     # 服务端（Fastify + better-sqlite3）
│   ├── cli/        # 命令行工具（Commander）
│   ├── web/        # Web 前端（React + Vite）
│   └── shared/     # 共享类型和工具
├── dist/           # 构建输出
├── docs/           # 工程文档
├── logs/           # 开发日志
└── package.json    # 单一包配置
```

## 系统架构

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Web UI    │────▶│   Server    │◀───▶│   SQLite    │
│  (React)    │     │ (Background)│     │  Database   │
└─────────────┘     └──────┬──────┘     └─────────────┘
                           │
                    ┌──────┴──────┐
                    │    CLI      │
                    │ (Commander) │
                    └─────────────┘
```

## 运行时架构

```
┌─────────────────────────────────────────────────────────┐
│                   User's Terminal                        │
│  ┌─────────────┐                                        │
│  │  keyroll    │◀─── start/stop/status commands         │
│  │   (CLI)     │                                        │
│  └─────────────┘                                        │
└─────────────────────────────────────────────────────────┘
                           │
                           │ controls
                           ▼
┌─────────────────────────────────────────────────────────┐
│               Background Server Process                  │
│  ┌─────────────┐     ┌─────────────┐                    │
│  │  Fastify    │◀───▶│   SQLite    │                    │
│  │   Server    │     │  Database   │                    │
│  └─────────────┘     └─────────────┘                    │
│                                                           │
│  ┌─────────────┐                                         │
│  │  Web UI     │ (served via static files)              │
│  │  (React)    │                                         │
│  └─────────────┘                                         │
└─────────────────────────────────────────────────────────┘
```

## 模块划分

| 模块 | 职责 | 技术栈 | 入口 |
|------|------|--------|------|
| Server | 核心业务逻辑、数据持久化、API 服务（后台运行） | Fastify 5.x + better-sqlite3 | `src/server/index.ts` |
| Web | 用户界面交互 | React 19 + Vite | `src/web/main.tsx` |
| CLI | 命令行操作接口、服务器生命周期管理 | Commander + chalk + ora | `src/cli/index.ts` |
| Shared | 共享类型定义和工具函数 | TypeScript | - |

## CLI 职责

CLI 是用户与 Keyroll 交互的主要接口，负责：

| 功能 | 说明 |
|------|------|
| `start` | 启动后台 server 进程 |
| `stop` | 关闭后台 server 进程 |
| `status` | 兜底命令，显示产品概要信息（名称、描述、版本、后台进程状态、可用命令列表） |
| 其他子命令 | 数据管理、设备管理等操作 |

## 技术栈

### 后端
| 技术 | 版本 | 用途 |
|------|------|------|
| Fastify | ^5.2.1 | Web 框架 |
| @fastify/cors | ^10.0.2 | CORS 插件 |
| @fastify/static | ^8.1.1 | 静态文件服务 |
| better-sqlite3 | ^11.8.1 | SQLite 数据库 |

### 前端
| 技术 | 版本 | 用途 |
|------|------|------|
| React | ^19.0.0 | UI 框架 |
| React Router | ^7.1.5 | 路由管理 |
| Ant Design | ^5.24.0 | UI 组件库 |
| React Query | ^5.66.0 | 服务端状态管理 |
| Vite | ^6.1.0 | 构建工具 |
| LESS | ^4.2.2 | CSS 预处理器 |

### 开发工具
| 工具 | 版本 | 用途 |
|------|------|------|
| TypeScript | ^5.7.3 | 开发语言 |
| tsx | ^4.19.3 | TypeScript 执行环境 |
| concurrently | ^9.1.2 | 并行运行命令 |

## 数据库设计

- 使用 SQLite 单文件存储（不启用 WAL）
- 数据目录：`~/.keyroll/`
- 数据库文件：`~/.keyroll/keyroll.db`

详细数据模型参见 [数据模型文档](data-model.md)。

## 设计约束

1. 主键使用 `record_key` 路径式 URN，支持前缀匹配查询
2. 时间戳使用 Unix 秒级整数
3. 使用 `deleted_at` 字段软删除
4. 域（domain）是全局元数据，不存储于本地
