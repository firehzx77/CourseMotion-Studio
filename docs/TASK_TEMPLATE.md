# T00x 任务名称

> **用途**：记录任务范围、非目标、验收、文档同步、执行状态和验收状态。
> **范围外**：实际工作流规则继承自 `.protocol/protocol.json` 引用的上游规则。项目特定偏离写入 `.protocol/PROTOCOL_OVERRIDES.md`。

## 元数据

| 字段 | 值 |
|------|----|
| 父项 | None / related task |
| 状态 | Design needed / Ready / Planned / In progress / Done / Blocked / Deferred |
| 类型 | Design / Implementation / Data / Docs / Validation |
| 优先级 | P0 / P1 / P2 / P3 |
| 大小 | S / M / L / XL |
| Owner | Human user |
| Reviewer / Approver | Human user |
| 依赖 | None / T00x |

文档-only 任务在请求清晰时可跳过测试命令执行和验收步骤；仍需检查改动文档，并在 Result 中记录简要说明。

## 需求

### 父项目标

描述整体产品或工程目标。

### 本任务目标

描述本任务负责什么、为什么现在做、完成后解锁什么。

### 用户可见结果

描述用户、客户、维护者或评审者在完成后能观察到什么。

## 范围

本任务会：

- ...

本任务不会：

- ...

## 验证

- 命令：当前项目尚无自动化验证命令；创建技术栈后替换为真实命令。
- 手动验证：...
- [TESTING.md](./TESTING.md) 中的测试深度：Quick / Standard / Core regression / Release
- 影响的核心能力：None / ...
- 已检查的生成物：None / ...
- 缺失测试：None / 补充或提出 ...
- 文档-only 例外：清晰的文档-only 变更可跳过命令执行，但仍需检查改动文档。

## 成功标准

- [ ] ...

## 验收 Owner 与证据

| 字段 | 值 |
|------|----|
| Acceptance owner | Human user |
| Demo / evidence | ... |
| Rollback note | None / ... |

## 需要同步的文档

- [ ] `docs/ARCHITECTURE.md`
- [ ] `docs/USER_GUIDE.md`
- [ ] `docs/TASKS.md`
- [ ] Other: ...
- [ ] No docs sync needed because: ...

## 依赖

| 任务 | 状态 | 摘要 |
|------|------|------|
| None | - | - |

## 设计

> 通过 `task_design` 确认设计后填写。不适用的维度可跳过。轻量变更和 bug 修复可以留空。

- **选定方案**：选择了什么方案，为什么。
- **放弃的方案**：考虑过什么，为什么不选。
- **UX / 交互**：用户流程、页面、交互、边界状态。
- **视觉**：布局、组件、视觉方向。
- **数据模型 / DB**：schema、迁移、关系。
- **架构**：模块边界、依赖、接口。
- **API**：端点、输入、输出、错误处理。
- **范围外**：本设计明确不包含什么。

## 执行计划

任务执行计划确认后回填：

- Confirmed by:
- Date:
- Plan:
- Files likely touched:
- Docs sync:
- Verification:
- Test evidence:
- New or missing tests:

## 范围变更日志

如果执行中必须改变范围、验收、owner、优先级或依赖，先提出变更请求；确认后记录在这里。

| 日期 | 变更原因 | 影响 | 新验收说明 | 确认人 |
|------|----------|------|------------|--------|
| YYYY-MM-DD | ... | ... | ... | ... |

## 决策日志

| 日期 | 决策 | 原因 |
|------|------|------|
| YYYY-MM-DD | ... | ... |

## 结果

完成后回填：

- 主要改动：
- 验证结果：
- 核心能力影响：
- 缺失测试覆盖：
- 改动文档：
- 后续事项：
- 回滚或风险说明：

## 完成检查

执行完成前：

- [ ] 已检查 `git status --short`，并保护既有未提交改动；如果不是 git 仓库，已说明。
- [ ] 设计部分已填写并确认，或这是可跳过设计的轻量变更 / bug 修复。
- [ ] 范围事项已完成。
- [ ] 非目标没有被悄悄实现。
- [ ] 文档同步已完成，或已记录无需同步的原因。
- [ ] 验证命令和手动验证结果已记录，或这是已检查的文档-only 变更。
- [ ] 已对照 TESTING.md 检查核心能力影响。
- [ ] 缺失测试覆盖已补充，或记录为后续事项。
- [ ] Result 部分已回填。
- [ ] 范围变更日志在相关时已确认并同步。
- [ ] 已记录改动文件、验证或文档-only 跳过说明、文档影响和残余风险。
- [ ] 任务未标记为 `Done`；除默认接受的文档-only 变更外，等待用户确认验收。
- [ ] 没有创建 git 提交。

验收后：

- [ ] Acceptance owner / reviewer 已确认。
- [ ] `TASKS.md` 中任务状态已更新为 `Done`。
- [ ] 本文件 `状态` 已更新为 `Done`。
- [ ] 如果工作流要求或用户请求，已创建验收提交。
