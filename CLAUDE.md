# 工作方法

**开始任何工作之前，请先阅读 AGENTS.md** 了解产品概要和工作流程。

## 核心流程

1. **启动任务时**：阅读 `AGENTS.md` 获取完整的工作方法指引
2. **查看待办**：阅读 `docs/todo-list.md` 了解当前任务
3. **查阅文档**：按需阅读相关规范文档
4. **执行开发**：遵守文档约束，完成后更新记录

## 关键文档

| 文档 | 用途 |
|------|------|
| `AGENTS.md` | 产品概要与工作方法 |
| `docs/todo-list.md` | 待办任务列表 |
| `docs/roadmap.md` | 产品路线图 |
| `docs/dev-guide.md` | 开发规范 |
| `docs/architecture.md` | 架构设计 |
| `docs/data-model.md` | 数据模型 |

## 代码变更要求

修改代码后必须执行：
1. `npm run lint` 检查代码
2. 所有 error 必须修复
3. 记录未处理的 warning

---

**重要：不阅读 AGENTS.md 就直接开始工作可能导致偏离既定的工作流程和设计约束。**
