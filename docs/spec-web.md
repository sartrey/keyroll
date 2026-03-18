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
├── App.tsx           # 根组件
├── index.less        # 全局样式
├── assets/           # 静态资源（图片、字体等）
├── services/         # API 服务层
│   ├── fetcher.ts    # 自定义 fetch 封装
│   └── records.ts    # Records 相关 API 操作
└── pages/            # 页面组件
    ├── Dashboard.tsx
    ├── Records.tsx
    └── Settings.tsx
```

## 页面结构

### 布局

```
┌─────────────────────────────────────┐
│  Sider    │  Header                 │
│           ├─────────────────────────┤
│  - Dashboard│  Content              │
│  - Records  │                       │
│  - Settings │                       │
│           │                       │
└───────────┴─────────────────────────┘
```

### 路由设计

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | Dashboard | 仪表盘，显示统计信息 |
| `/records` | Records | 记录列表和管理 |
| `/settings` | Settings | 系统设置 |

## 服务层架构

### services/ 目录

所有 API 调用逻辑组织在 `web/services` 目录，每个 UI 可依赖的操作（可能包含一个或多个 API 的组合）实现为一个 service 层文件。

**设计原则**：
- 每个 service 文件导出 `async` 函数提供操作
- 使用自定义的 `fetcher` 组件作为请求工具
- **不使用 react-query**，使用原生的 `fetch` 实现

### 自定义 fetcher

```typescript
// src/web/services/fetcher.ts

export const API_BASE = '/api';

export async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}
```

### Service 示例

```typescript
// src/web/services/records.ts
import { fetcher } from './fetcher';
import type { KeyrollRecord } from '../../shared/types';

export async function listRecords(params?: {
  prefix?: string;
  domain?: string;
  type?: string;
  secureLevel?: number
}): Promise<KeyrollRecord[]> {
  const search = new URLSearchParams();
  if (params?.prefix) search.set('prefix', params.prefix);
  if (params?.domain) search.set('domain', params.domain);
  if (params?.type) search.set('type', params.type);
  if (params?.secureLevel !== undefined) search.set('secureLevel', String(params.secureLevel));
  const query = search.toString();
  return fetcher(`/records${query ? `?${query}` : ''}`);
}

export async function getRecord(recordKey: string): Promise<KeyrollRecord> {
  const encodedKey = encodeURIComponent(recordKey.slice(1));
  return fetcher(`/records/${encodedKey}`);
}

export async function putRecord(
  recordKey: string,
  body: {
    recordType: 'plain' | 'refer';
    recordValue: string;
    contentType: string;
    secureLevel?: number
  }
): Promise<{ success: boolean }> {
  const encodedKey = encodeURIComponent(recordKey.slice(1));
  return fetcher(`/records/${encodedKey}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export async function deleteRecord(recordKey: string): Promise<{ success: boolean }> {
  const encodedKey = encodeURIComponent(recordKey.slice(1));
  return fetcher(`/records/${encodedKey}`, {
    method: 'DELETE',
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
