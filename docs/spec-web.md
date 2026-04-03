# Web UI 设计规范

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | ^19.0.0 | UI 框架 |
| React Router | ^7.1.5 | 路由管理 |
| Ant Design | ^5.24.0 | UI 组件库 |
| Vite | ^6.1.0 | 构建工具 |
| LESS | ^4.2.2 | CSS 预处理器 |

## 目录结构

```
src/web/
├── main.tsx          # 应用入口
├── App.tsx           # 根组件（路由守卫）
├── index.less        # 全局样式
├── assets/           # 静态资源
├── services/         # API 服务层
│   ├── fetcher.ts    # 自定义 fetch 封装
│   ├── authn.ts      # 认证相关操作
│   └── records.ts    # 记录 CRUD 操作
└── pages/            # 页面组件
    ├── database.tsx  # 数据管理页
    ├── settings.tsx  # 设置页
    └── authn/        # 认证相关页面
        ├── authn.less
        ├── login.tsx  # 登录页
        └── setup.tsx  # 初始化页
```

## 页面结构

### 布局

```
┌─────────────────────────────────────┐
│  Sider    │  Header                 │
│           ├─────────────────────────┤
│  - Database│  Content               │
│  - Settings│                        │
│           │                       │
└───────────┴─────────────────────────┘
```

### 路由设计

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | - | 根路径，重定向到 `/database` |
| `/database` | Database | 数据管理与记录 CRUD |
| `/settings` | Settings | 系统设置与账户管理 |
| `/authn/login` | AuthnLogin | 登录页（密码登录 / 恢复码） |
| `/authn/setup` | AuthnSetup | 首次初始化向导 |

## 服务层架构

### services/ 目录

所有 API 调用逻辑组织在 `web/services` 目录，每个模块的操作实现为一个 service 文件。

**当前服务列表**：
- `fetcher.ts` — 统一请求封装，自动注入 Bearer Token，失败时自动 message.error
- `authn.ts` — 认证操作（状态检查、初始化、登录、密码更新、恢复码验证、登出、Token 存取）
- `records.ts` — 记录 CRUD（listRecords、getRecord、createRecord、updateRecord、deleteRecord）

**设计原则**：
- 每个 service 文件导出 `async` 函数提供操作
- 使用自定义的 `fetcher` 作为请求工具
- **不使用 react-query**，使用原生的 `fetch` 实现

### 自定义 fetcher

```typescript
// src/web/services/fetcher.ts

export const ApiBase = '/api';

export async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = getAccessToken();

  const response = await fetch(`${ApiBase}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...token ? { Authorization: `Bearer ${token}` } : {},
      ...options?.headers
    }
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const detail = body?.error ?? body?.errorId ?? body?.message ?? `Request failed: ${response.status}`;
    message.error(detail, 5);
    const err = new Error(detail);
    (err as any)._apiError = true;
    throw err;
  }

  return response.json();
}
```

### Service 示例

```typescript
// src/web/services/records.ts
import type { IRecord } from '../../shared/types';
import { fetcher } from './fetcher';

export async function listRecords(params?: {
  prefix?: string;
  domain?: string;
  type?: string;
  secureLevel?: number;
}): Promise<IRecord[]> {
  const result = await fetcher<{ content: { items: IRecord[]; }; }>('/model/records/search', {
    method: 'POST',
    body: JSON.stringify(params ?? {})
  });
  return result.content?.items ?? [];
}

export async function getRecord(recordKey: string): Promise<IRecord> {
  const result = await fetcher<{ content: { record: IRecord; }; }>('/model/records/detail', {
    method: 'POST',
    body: JSON.stringify({ recordKey })
  });
  return result.content.record;
}

export async function createRecord(
  recordKey: string,
  body: {
    recordType: IRecord['recordType'];
    recordValue: string;
    contentType: string;
    secureLevel?: number;
  }
): Promise<void> {
  await fetcher('/model/records/create', {
    method: 'POST',
    body: JSON.stringify({ recordKey, ...body })
  });
}
```

## 组件规范

### AntD 组件使用

- 使用 AntD 导出的标准组件
- 不要臆造不存在的子组件（如 `Input.Select`）
- 正确使用组件的组合方式

```tsx
// 错误
<Input.Select>
  <Input.Select.Option value="a">A</Input.Select.Option>
</Input.Select>

// 正确
<Select>
  <Select.Option value="a">A</Select.Option>
</Select>
```

### 表单组件

- 使用 `Form.Item` 包裹输入组件
- 使用 `Form.useForm()` 获取表单实例
- 验证规则通过 `rules` 属性定义

### 数据表格

- 使用 `Table` 组件展示列表数据
- `rowKey` 指定唯一键
- `columns` 定义列配置

## 颜色规范

| 用途 | 颜色 | 说明 |
|------|------|------|
| 主色 | `#1890ff` | 链接、主按钮 |
| 成功 | `#52c41a` | 成功状态 |
| 警告 | `#faad14` | 警告状态 |
| 错误 | `#ff4d4f` | 错误状态、危险操作 |

## 响应式设计

- Sider 使用 `breakpoint="lg"` 支持响应式折叠
- 表格列使用 `ellipsis` 支持内容溢出省略

## 状态管理

- 使用 `useState` / `useReducer` 管理组件本地状态
- API 调用使用原生 `fetch` + `async/await`
- 避免不必要的全局状态
