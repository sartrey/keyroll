# Keyroll Roadmap

## Current Status

项目框架已完成，单一 npm 包结构：

- ✅ 单一 package.json 管理所有依赖
- ✅ TypeScript 配置（Server + Web）
- ✅ Vite 构建配置
- ✅ 服务端：Express + better-sqlite3
- ✅ Web 端：React + Vite + TypeScript
- ✅ CLI：Commander
- ✅ 共享类型：src/shared/

## Next Steps

### Phase 1: 核心功能完善

- [ ] 完善 Records 页面 CRUD 操作
- [ ] 完善 Devices 管理功能
- [ ] 实现 Settings 配置页面
- [ ] Dashboard 数据统计展示

### Phase 2: 数据同步

- [ ] 设备间同步协议设计
- [ ] 增量同步机制
- [ ] 冲突解决策略

### Phase 3: 安全加密

- [ ] 数据加密存储
- [ ] 设备认证机制
- [ ] 密钥管理
