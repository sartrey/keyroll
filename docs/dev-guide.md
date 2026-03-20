# 开发指南

## 快速命令

```bash
# 安装依赖
npm install

# 开发模式（server + web）
npm run dev

# 单独启动 server
npm run dev:server

# 单独启动 web
npm run dev:web

# 构建
npm run build

# 生产启动
npm start

# CLI
npm run cli -- <command>
```

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式（server + web）
npm run dev

# 构建
npm run build

# 生产启动
npm start

# CLI
npm run cli -- <command>
```

## 开发模式

```bash
# 启动全部服务
npm run dev

# 单独启动 server
npm run dev:server

# 单独启动 web
npm run dev:web

# 使用 CLI
npm run cli -- <command>
```

## 构建

```bash
# 构建全部
npm run build

# 启动生产环境
npm start
```

## 项目约定

### 代码风格

- 使用 TypeScript 严格模式
- ES Module 语法
- 文件使用 `.ts` / `.tsx` 扩展名
- React 组件使用函数式 + Hooks

### Node.js 模块导入规范

- **所有 Node.js 原生模块必须使用 `node:*` 前缀**
  - 正确：`import fs from 'node:fs'`
  - 正确：`import { spawn } from 'node:child_process'`
  - 错误：`import fs from 'fs'`
  - 错误：`import { spawn } from 'child_process'`

- **对于有 promise API 的模块，优先使用 `fs.promises` 方式**
  - 正确：`import fs from 'node:fs'` + `await fs.promises.readFile(...)`
  - 正确：`import { readFile } from 'node:fs/promises'`
  - 避免：`import { readFile } from 'node:fs'` (callback API)

### 文案展示规范

- **CLI 输出不使用冒号**，使用空白字符分隔键和值
  - 正确：`Name              keyroll`
  - 错误：`Name: keyroll`

- **CLI 命令输出前后保留空行**，与其他终端输出区分

- **Web 界面不使用冒号**，使用 margin/padding 或网格布局表达间距

- **状态命令输出精简**
  - 标题行只显示产品名称，不显示描述
  - 产品信息各字段独立一行，不重复标题

### 目录规范

```
src/
├── server/         # 服务端代码
│   ├── api/        # API 路由
│   └── db/         # 数据库层
├── cli/            # 命令行工具
├── web/            # Web 前端
│   ├── components/ # React 组件
│   ├── pages/      # 页面组件
│   └── api.ts      # API 客户端
└── shared/         # 共享类型和工具
```

### 命名约定

| 类型 | 命名风格 | 示例 |
|------|----------|------|
| 文件/目录 | kebab-case | `user-profile.tsx` |
| 组件 | PascalCase | `UserProfile` |
| 函数/变量 | camelCase | `getUserData` |
| 常量 | UPPER_SNAKE_CASE | `API_VERSION` |
| 类型/接口 | PascalCase | `User`, `UserProfile` |

### 类型命名

- **非必要不要使用 `as` 重命名类型**。应优先考虑如何在类型定义时区分类型命名。
  - 错误：`import { IRecord as KeyrollRecord } from './types'`
  - 正确：在定义时就用清晰的名称 `export interface KeyrollRecord { ... }`

### React / AntD 组件

- 使用 AntD 组件时使用正确导出的组件，不要臆造不存在的子组件
  - 错误：`<Input.Select>`, `<Input.Select.Option>`
  - 正确：`<Select>`, `<Select.Option>`

### Git 提交

```bash
# 功能开发
git commit -m "feat: add volume management"

# 修复 bug
git commit -m "fix: handle null record in API"

# 重构
git commit -m "refactor: extract API client"

# 文档
git commit -m "docs: update API specification"
```

## 调试技巧

### Server

Server 使用 `tsx watch` 实现热重载，修改代码后自动重启。

### Web

Vite 开发服务器支持 HMR，React 组件修改后即时刷新。

### 数据库

数据库文件位于 `~/.keyroll/keyroll.db`，可使用以下工具查看：
```bash
# SQLite CLI
sqlite3 ~/.keyroll/keyroll.db

# 或使用 GUI 工具如 DB Browser for SQLite
```

## 常见问题

### 端口被占用

```bash
PORT=3001 npm run dev:server
```

### 依赖问题

```bash
rm -rf node_modules package-lock.json
npm install
```
