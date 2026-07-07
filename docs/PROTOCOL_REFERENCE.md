# Protocol Reference

> **用途**：用人类可读的方式说明本项目当前采用的 solo 协议、常见请求、路由结果和任务记录方式。
> **范围外**：真正的协议规则以 `.protocol/protocol.json` 引用的上游规则和 `.protocol/PROTOCOL_OVERRIDES.md` 为准。

## 当前协议

| 项 | 值 |
|----|----|
| 协议包 | `agent-project-protocol-solo` |
| Level | `solo` |
| Language | `zh-CN` |
| 本地覆盖 | `.protocol/PROTOCOL_OVERRIDES.md`，当前无覆盖 |
| 默认 owner / reviewer / acceptance owner | 当前用户 |

Solo 模式强调直接推进个人项目：清晰的小任务可以快速处理，同时通过 `docs/TASKS.md` 和 `docs/tasks/` 保留轻量任务记录。默认不使用 sprint、brainstorm 或 backlog grooming 文件。

## Agent 进入项目时要读什么

1. `AGENTS.md`
2. `.protocol/protocol.json`
3. 上游规则：`primitive-command.md`、`level-gate.md`、`router-policy.md`、`workflow-map.md`
4. `.cursor/rules/*.mdc`
5. `.protocol/PROTOCOL_OVERRIDES.md`
6. 与当前请求相关的项目文档和源码

## 常见请求

| 你可以说 | Agent 应如何处理 |
|----------|------------------|
| `status` | 读取项目状态、任务、风险和工作区情况，只读回复 |
| `next` | 推荐一个下一步动作 |
| `help` / `commands` | 解释可用请求和工作流 |
| `sync docs` | 直接同步项目文档；无需提案、测试命令执行或验收 |
| `start a new project ...` | 如果项目尚未成形，先给出项目启动方案 |
| `I want to build ...` | 空项目走启动；已有项目走需求梳理 |
| `new requirement: ...` | 进入需求梳理，决定是任务、轻量变更还是需要澄清 |
| `review this` | 按 `docs/REVIEWS.md` 的维度或画像做评审 |
| `test this` / `verify this` | 按 `docs/TESTING.md` 选择验证深度和证据 |
| `execute task T00x` | 检查任务设计是否完整，再执行 |
| `continue task T00x` | 继续已确认计划 |
| `accept task T00x` | 先给出验收评审提案；用户确认后才写回 |
| `release review` | 做发布准备评估，默认只读 |

## 路由层级

| 层级 | 含义 | 是否写文件 |
|------|------|------------|
| T0 | 直接只读，例如 `status`、`help` | 否 |
| T1 | 提案或诊断，例如需求梳理、评审、测试计划、验收提案 | 首次回复不写 |
| T2 | 文档同步、配置写回、任务元数据写回 | 视工作流而定；`sync docs` 可直接写 |
| T3 | 已确认的实现或任务执行 | 通常需要确认；清晰低风险请求可直接推进 |
| T4 | 验收写回或提交 | 必须由用户明确确认；提交必须明确请求 |

## 任务记录

默认任务位置：

- `docs/TASKS.md`
- `docs/tasks/T001-short-name.md`
- `docs/TASK_TEMPLATE.md`
- `docs/QUICK_TASK_TEMPLATE.md`

任务 ID 使用 `T001`、`T002`、`T003`。如果 `docs/TASKS.md` 和具体任务文档冲突，以具体任务文档为准，并同步更新任务列表。

状态值：

- `Unscheduled`
- `Planned`
- `Design needed`
- `Ready`
- `In progress`
- `Done`
- `Blocked`
- `Deferred`

任务执行不会自动标记 `Done`。`Done` 需要用户明确验收。

## 文档同步规则

`sync docs` 用于：

- 替换初始化占位内容。
- 让项目本地文档匹配真实项目文件、命令、测试和任务状态。
- 将项目本地文档对齐到 `.protocol/protocol.json` 的 `language`。
- 清理文档漂移、过期命令和错误路径。

`sync docs` 不需要提案、测试命令执行或验收；但 Agent 必须检查改动文档，并在结束时列出改动文件和简要说明。

## 当前项目状态提示

当前项目尚未创建源码、测试命令或运行命令。下一步通常是确认产品方向，并用 `start a new project ...` 创建第一个可运行版本。

在此之前，Agent 不应把项目名称、模板文字或用户未确认的想法当作产品事实。

## 何时需要确认

以下情况需要用户明确确认：

- 决定产品方向或技术栈。
- 创建首次应用骨架。
- 引入外部服务、网络访问、账号、支付、遥测、secrets 或敏感数据处理。
- 执行破坏性文件操作。
- 改变协议级别或引入团队工作流。
- 标记任务 `Done`。
- 创建 git 提交。
