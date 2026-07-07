# Coding Guide

> **用途**：记录 `CourseMotion Studio` 的编码标准和技术栈实践，让人和 AI Agent 以一致、可维护的方式改动项目。
> **范围外**：架构、所有权、契约和命令事实属于 [ARCHITECTURE.md](./ARCHITECTURE.md)。测试策略属于 [TESTING.md](./TESTING.md)。评审配置属于 [REVIEWS.md](./REVIEWS.md)。

当前项目尚未选择技术栈，也没有源码。创建第一个应用骨架后，应在本文件补充真实框架、目录约定、格式化、lint、类型检查、测试和依赖策略。

## 原则

- 先匹配现有项目风格，再引入新模式。
- 优先做清晰、局部、可验证的改动。
- 只有在能减少真实复杂度、消除有意义重复或稳定边界时才抽象。
- 公开行为、契约和数据格式必须明确。
- 不把功能工作和无关清理混在一起。
- 不把未知产品方向或技术栈写成事实。

## 代码组织

| 关注点 | 默认指导 |
|--------|----------|
| 入口 | 应用、CLI、API、worker 或脚本入口要薄且容易定位 |
| 领域逻辑 | 将业务规则放在可测试函数或模块中，而不是藏在 UI handler 或 route body 里 |
| UI 组件 | 组件聚焦单一职责；重复出现后再抽取共享组件 |
| 状态 | 状态所有权要清楚，避免多个层级复制同一事实来源 |
| 数据访问 | 持久化、文件 I/O、网络调用和外部服务应隔离在小接口后 |
| 配置 | 默认值、必需环境变量和示例配置要记录清楚 |
| 测试 | 测试位置要可预测；测试名称描述行为而不是实现细节 |

## 风格与可维护性

- 使用项目已经配置的 formatter、linter、类型检查器和命名约定；当前尚未配置。
- 函数和模块保持内聚。职责混杂时再拆分。
- 偏好明确的数据形状和返回值。
- 避免深层嵌套；必要时用早返回或小 helper 提高清晰度。
- 注释用于解释非显然决策、约束或外部行为，不解释常规赋值。
- 除非任务包含迁移，否则保持公开名称稳定。

## 技术栈实践区

创建技术栈后，保留适用行并删除不适用行。

| 区域 | 实践说明 |
|------|----------|
| Frontend UI | 语义结构、响应式布局、loading/error/empty 状态和可访问性状态要在代码与检查中可见 |
| Component frameworks | 框架支持时，区分展示组件、状态容器、hooks/composables 和 service calls |
| Backend/API | validation、authorization、domain logic、persistence 和 response mapping 应足够分离以便测试 |
| CLI/scripts | 支持清晰参数、友好错误、必要时的 dry-run 和可预测 exit code |
| Data/schema | schema 变更、迁移、默认值、兼容性和回滚说明要在验收前记录 |
| Async/jobs | retry、idempotency、timeout、cancellation 和 failure visibility 要明确 |
| Generated artifacts | 源文件与生成物分离，并记录重新生成命令 |
| AI/automation | prompt、model setting、tools 和 output schema 影响行为时要版本化或记录 |

## 错误处理与可观测性

- 在系统边界验证外部输入。
- 栈支持时使用 typed 或 structured errors。
- 日志应足以诊断问题，但不能泄露 secrets 或个人数据。
- 用户可见错误要可操作。
- retry 和 fallback 行为要有边界、可测试、可解释。

## 依赖

- 优先使用标准库、已有依赖或广泛使用的包。
- 只有依赖能明显降低复杂度或风险时才新增。
- 相关时检查 license、维护状态、安全状况、bundle/runtime 成本和传递影响。
- 依赖变更应同步更新安装说明、lockfile 和测试策略。

## 安全与数据边界

以下变更必须先走需求澄清或获得明确确认：

- authentication、authorization、roles、sessions 或 tokens
- secrets、环境变量或 credential storage
- payment、billing、privacy、telemetry 或 personal data behavior
- 数据删除、迁移、回滚或破坏性文件操作
- 外部网络行为、webhook、cloud services 或 background jobs

## AI 编码规则

编辑代码前，AI 应读取附近实现、相关测试和本指南。完成前应报告：

- 改了哪些文件以及原因。
- 遵循了哪些风格或栈约定。
- 同步了哪些文档，或为什么不需要文档同步。
- 按 [TESTING.md](./TESTING.md) 选择了什么验证。
- 缺失覆盖、手动检查和残余风险。
