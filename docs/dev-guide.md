# 开发指南

## 快速命令

```bash
npm install            # 安装依赖
npm run dev            # 开发模式（server + web）
npm run dev:server     # 单独启动 server
npm run dev:web        # 单独启动 web
npm run build          # 构建全部
npm start              # 生产启动
npm run cli -- <cmd>   # CLI
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
├── server/
│   ├── controllers/      # API 控制器（按模型命名 authn、model）
│   ├── middlewares/      # 中间件（按功能命名：authn）
│   ├── services/         # 业务服务
│   │   ├── config.ts     # 统一配置（UserDataDir 等）
│   │   ├── credential-manager.ts
│   │   ├── crypto.ts
│   │   ├── database.ts
│   │   ├── session.ts
│   │   └── rate-limiter.ts
│   └── index.ts
├── cli/
├── web/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── app.tsx
│   └── index.tsx         # Web 入口（标准约定）
└── shared/
```

### 命名约定

| 类型 | 命名风格 | 示例 |
|------|----------|------|
| 文件/目录 | kebab-case | `user-profile.ts`, `authn.ts`, `credential-manager.ts` |
| 组件 | PascalCase | `UserProfile` |
| 函数/变量 | camelCase | `getUserData` |
| 常量 | UPPER_SNAKE_CASE | `API_VERSION`, `UserDataDir` |
| 类型/接口 | PascalCase + I 前缀 | `IRecord`, `ICredentialsData` |

### 文件命名原则

1. **避免冗余信息**
   - 在 `services/` 目录下，文件名不需要 `-service` 后缀
   - Manager 类使用 `-manager` 后缀（如 `credential-manager.ts`）
   - 工具函数使用简洁命名（如 `crypto.ts`, `database.ts`）

2. **controllers 按模型命名**
   - `authn.ts` - 认证 API 控制器
   - `model.ts` - 数据模型 API 控制器

3. **middlewares 按功能命名**
   - `authn.ts` - 认证中间件（区别于 authz 授权）

4. **Web 入口使用标准命名**
   - `index.tsx` - Web 应用入口文件

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
