# Keyroll

Local-first personal data storage system.

## Architecture

- **Server**: Node.js + TypeScript 常驻服务，承载核心业务逻辑
- **CLI**: 命令行访问工具
- **Web UI**: React + Vite + TypeScript 网页界面

## Getting Started

```bash
# Install dependencies
npm install

# Development mode
npm run dev

# Build
npm run build

# Start server
npm start

# CLI usage
npm run cli
```

## Project Structure

```
keyroll/
├── server/          # 核心服务
├── cli/             # 命令行工具
├── web/             # Web 界面
├── shared/          # 共享类型和工具
└── packages/        # 内部包
```
