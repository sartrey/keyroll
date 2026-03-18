# CLI 设计规范

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Commander | ^12.x | 命令行框架 |
| chalk | ^5.x | 终端颜色 |
| ora | ^8.x | 加载动画 |

## 命令结构

```bash
keyroll <command> [options]
```

### 全局选项

| 选项 | 说明 |
|------|------|
| `-V, --version` | 输出版本号 |
| `-h, --help` | 输出帮助信息 |

## 命令列表

### 服务器管理

| 命令 | 说明 |
|------|------|
| `keyroll start` | 启动服务器 |
| `keyroll status` | 检查服务器状态 |

### 数据管理

| 命令 | 说明 |
|------|------|
| `keyroll volume:list` | 列出所有数据卷 |
| `keyroll volume:create <name>` | 创建新数据卷 |

## 命令示例

```bash
# 启动服务器（默认端口 3000）
keyroll start

# 启动服务器（指定端口）
keyroll start -p 8080

# 查看状态
keyroll status

# 列出数据卷
keyroll volume:list

# 创建数据卷
keyroll volume:create my-data
```

## 输出规范

### 颜色使用

| 场景 | 颜色 | 示例 |
|------|------|------|
| 成功 | 绿色 | `Server started` |
| 信息 | 蓝色 | `Checking status...` |
| 警告 | 黄色 | `Port 3000 is in use` |
| 错误 | 红色 | `Failed to connect` |

### 加载状态

使用 `ora` 显示加载动画：

```typescript
const spinner = ora('Starting server...').start();
// 操作完成后
spinner.stop();
```

## 错误处理

- 命令执行失败时输出清晰的错误信息
- 提供可能的解决方案建议
- 使用非零退出码表示失败

## 帮助信息

每个命令都应提供 `-h, --help` 选项，输出：
- 命令描述
- 可用选项
- 使用示例
