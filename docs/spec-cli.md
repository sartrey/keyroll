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
| `keyroll start` | 启动后台 server 进程 |
| `keyroll stop` | 关闭后台 server 进程 |
| `keyroll status` | 显示服务器状态（默认命令） |

### 设计原则

CLI **不提供**任何直接读写数据的命令，原因：
- 数据访问需要通过 API 认证流程
- 数据读写由 Web UI 提供图形界面
- CLI 仅负责服务器生命周期管理

## 命令示例

```bash
# 启动服务器（后台运行）
keyroll start

# 查看状态
keyroll status

# 停止服务器
keyroll stop
```

**注意**：CLI 不提供数据读写命令，数据访问请通过 Web UI 或直接调用 API。

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
