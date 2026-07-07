# User Guide

> **用途**：面向人说明 `CourseMotion Studio` 当前是什么、如何开始、如何让 AI 处理任务，以及如何验收结果。
> **范围外**：产品承诺属于 [PRODUCT.md](./PRODUCT.md)。技术事实属于 [ARCHITECTURE.md](./ARCHITECTURE.md)。编码标准属于 [CODING_GUIDE.md](./CODING_GUIDE.md)。任务状态属于 [TASKS.md](./TASKS.md) 和 `docs/tasks/`。

## 当前项目是什么

`CourseMotion Studio` 当前是一个已接入 solo AI 协作协议的项目工作区。项目还没有应用源码、运行命令或明确产品定义。

## 适合谁使用

| 用户 | 建议用法 |
|------|----------|
| 个人开发者 | 用任务、轻量变更和验收流程快速推进 |
| Solo 维护者 | 让 Agent 保护已有改动，并保持必要文档同步 |
| 偶尔 vibe-coding 的用户 | 用 `start a new project...` 开始空项目，或用 `I want to build...` 描述第一个可见结果 |

## Solo 使用方式

本项目默认当前用户就是 owner、reviewer 和 acceptance owner。清晰的小改动可走 `lightweight_change`；较正式的工作应先记录任务，再执行并验收。

## 第一步

1. 打开项目根目录，让 AI 能读取 `AGENTS.md`、`.protocol/`、`.cursor/rules/`、`docs/` 和后续源码。
2. 输入 `status`，让 AI 查看当前任务、风险和工作区状态。
3. 输入 `help` 查看常用请求，或阅读 [PROTOCOL_REFERENCE.md](./PROTOCOL_REFERENCE.md)。
4. 由于当前项目尚未成形，请用 `start a new project ...` 或 `I want to build ...` 描述第一个目标。
5. 产品和技术栈确定后，再用 `new requirement: ...` 或 `execute task T00x` 处理普通需求。

项目默认响应语言和目标文档语言由 `.protocol/protocol.json` 的 `language` 决定，目前是 `zh-CN`。你可以在单次对话中要求其他语言。

## 常用 AI 请求

这些是自然语言请求，不是 CLI 子命令。

| 你可以说 | 用途 |
|----------|------|
| `status` | 查看当前项目状态 |
| `next` / `next action` | 让 Agent 推荐下一步 |
| `help` / `commands` | 查看常用命令和工作流 |
| `start a new project...` | 把空项目想法变成第一个小而可运行的版本 |
| `I want to build...` | 从自然语言功能目标开始 |
| `new requirement: ...` | 进入需求梳理 |
| `sync docs` | 同步协议、模板和项目本地文档 |
| `review this` / `architecture review` / `release review` | 按 [REVIEWS.md](./REVIEWS.md) 运行评审 |
| `test this` / `verify this` / `run checks` | 按 [TESTING.md](./TESTING.md) 选择并判断验证 |
| `execute task T00x` | 执行已记录任务 |
| `continue task T00x` | 继续已确认计划 |
| `accept task T00x` | 对已完成任务做验收评审 |
| `hotfix` / `lightweight` | 处理窄范围低风险变更 |

## 新需求如何进入流程

空项目先走 `project_bootstrap`：Agent 会确认最小可见版本、创建初始可运行形状，并把真实项目事实记录到文档中。

已成形项目的新需求不会立即写入或实现。Agent 会先给出 intake 建议，并推荐：

- `requirement_intake`：需求还需要整理。
- `create_task`：范围清楚，需要任务记录。
- `lightweight_change`：清晰、低风险、窄范围，可直接处理。

## 如何检查结果

实现后，Agent 应报告改动文件、行为变化、来自 [TESTING.md](./TESTING.md) 的测试深度、执行的验证、检查的生成物、影响的核心能力、需要的手动检查，以及风险或后续事项。

对于 `sync docs` 和清晰的文档-only 变更，Agent 可直接更新，默认跳过测试命令执行和验收，但仍要检查改动文档并报告改动说明。

正式任务需要 `accept task T00x`。只有用户确认验收后，Agent 才能把任务标记为 `Done`；提交也必须由用户明确请求。

## 评审

[REVIEWS.md](./REVIEWS.md) 定义项目本地评审维度和可复用评审画像，例如日常变更、用户可见变更、大变更、验收前和发布评审。随着产品和技术栈明确，可以继续定制这些维度。

## 测试

[TESTING.md](./TESTING.md) 定义核心能力、测试深度、常见测试类型和 AI 证据检查规则。当前没有源码或自动化命令，因此验证以文档检查为主。

## 编码指南

[CODING_GUIDE.md](./CODING_GUIDE.md) 定义代码组织、风格、依赖、安全边界和 AI 编码规则。创建技术栈后，应把真实 formatter、linter、测试命令和框架实践补进去。

## FAQ

### 为什么 AI 必须挂载项目根目录？

协议包只提供通用规则。项目事实、任务状态、覆盖规则、源码和测试都在项目根目录；只看上游协议包无法可靠工作。

### `sync docs` 会覆盖文件吗？

会。当你明确要求 `sync docs` 时，Agent 会用检查到的项目事实替换占位内容，跳过提案、测试命令执行和验收步骤，但必须检查改动文档并报告改动文件。

### 现在应该从哪里开始？

先确认产品方向。可以说：`start a new project for ...` 或 `I want to build ...`，并说明用户是谁、最重要的第一个结果是什么。

## 项目特定备注

待补充：产品方向、安装方式、启动命令、主要界面、常见操作、验收检查和已知限制。
