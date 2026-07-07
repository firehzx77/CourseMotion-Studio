# Review Catalog

> **用途**：定义项目本地评审维度、可复用评审画像、触发条件和证据要求。
> **范围外**：任务范围和验收属于 [TASKS.md](./TASKS.md) 与 `docs/tasks/`。产品和架构事实属于 [PRODUCT.md](./PRODUCT.md) 与 [ARCHITECTURE.md](./ARCHITECTURE.md)。

评审维度是项目数据，不是协议 primitive command。需要新增评审角度时，优先定制本文件，而不是新增命令名称。

当前项目尚未创建源码或产品实现，因此评审重点是协议入口、文档准确性、占位符清理、产品事实边界和首次启动准备度。

## 评审维度

| ID | 名称 | 目的 | 证据 | 节奏 |
|----|------|------|------|------|
| `product` | 产品评审 | 检查产品承诺、用户旅程、非目标和可见价值是否真实且可验证 | PRODUCT、任务说明、用户可见文档 | 重大用户可见变更 |
| `ux-design` | UX 设计评审 | 检查用户流程、信息层级、交互清晰度、空/loading/error 状态和最小可见结果 | PRODUCT、USER_GUIDE、任务说明、截图或原型 | 新流程、设计变更或主要用户可见变更 |
| `visual-design` | 视觉设计评审 | 检查布局、间距、字体、颜色、响应式表现和视觉一致性 | 相关视口截图、UI 代码、设计说明 | UI 或视觉变更 |
| `architecture` | 架构评审 | 检查边界、耦合、数据流和文档影响 | ARCHITECTURE、改动源码或配置 | 大范围或跨模块变更 |
| `implementation` | 实现评审 | 检查正确性、可维护性、边界情况和本地风格 | 改动代码、附近测试、本地模式 | 日常开发 |
| `tests-ci` | 测试与 CI 评审 | 检查测试深度、核心能力覆盖、脚本、CI/CD 影响和可复现性 | TESTING、脚本、测试文件、workflow、生成物证据 | 实现和发布 |
| `accessibility` | 可访问性评审 | 检查键盘、label、焦点顺序、对比度、reduce-motion 和包容性路径 | UI 改动、截图、手动可访问性检查 | 用户界面变更 |
| `docs` | 文档评审 | 检查 README、指南、架构、任务和协议文档是否漂移 | README、docs、任务文档 | 文档或行为变更 |
| `security-privacy` | 安全与隐私评审 | 检查 auth、secrets、permissions、personal data 和 unsafe defaults | 配置、环境说明、auth/data 代码 | 安全敏感变更 |
| `dependencies-license` | 依赖与许可评审 | 检查新增依赖、license 义务和发布打包风险 | package manifest、lockfile、LICENSE | 发布或依赖变更 |

## 评审画像

| ID | 名称 | 维度 | 触发条件 | 是否必需 |
|----|------|------|----------|----------|
| `daily-change` | 日常变更评审 | `implementation`, `tests-ci`, `docs` | 普通开发变更 | 建议 |
| `user-facing` | 用户可见变更评审 | `product`, `ux-design`, `visual-design`, `accessibility`, `tests-ci`, `docs` | UI、onboarding、CLI、文档或设计变更 | 验收前建议 |
| `large-change` | 大变更评审 | `product`, `ux-design`, `architecture`, `implementation`, `tests-ci`, `docs` | 范围广、风险高或跨模块变更 | 验收前建议 |
| `pre-acceptance` | 验收前评审 | `implementation`, `tests-ci`, `docs` | 接受完成任务前需要评审证据时 | 任务或用户要求时必需 |
| `release` | 发布评审 | `product`, `ux-design`, `architecture`, `tests-ci`, `docs`, `security-privacy`, `dependencies-license` | 发布准备 | 发布工作必需 |
| `docs-sync` | 文档同步评审 | `docs`, `product`, `architecture`, `tests-ci` | `sync docs` 或模板占位清理 | 文档同步时建议 |

## 反思维度

用于询问“整体进展如何”而不是评审某个具体改动。说 `reflect` 或 `how are we doing` 可触发反思。

| ID | 名称 | 目的 | 证据 |
|----|------|------|------|
| `stale-tasks` | 停滞任务 | 找出长时间未推进的任务，并判断是否仍相关 | TASKS、任务文档 |
| `tech-debt` | 技术债 | 发现已知捷径、TODO、延后质量工作和架构漂移 | 代码库、ARCHITECTURE、任务说明 |
| `goal-alignment` | 目标一致性 | 检查当前工作是否仍符合产品承诺和非目标 | PRODUCT、近期任务 |
| `recurring-blockers` | 重复阻碍 | 找出反复拖慢工作的模式 | 任务文档、近期任务说明 |

## 反思画像

| ID | 名称 | 维度 | 触发条件 |
|----|------|------|----------|
| `health-check` | 项目健康检查 | `stale-tasks`, `tech-debt`, `goal-alignment`, `recurring-blockers` | 定期或感觉项目不稳时 |

## 记录规则

项目评审和反思默认只读。用户要求保存、配置画像要求验收/发布证据，或评审发现应跟踪的后续工作时，才保存结果。

保存结果应包含：

- 评审范围。
- 所选评审维度 / 画像或反思维度。
- 已读取证据。
- 按严重程度排序的发现，或按优先级排序的反思建议。
- 建议结论：`Pass`、`Pass with follow-up`、`Needs changes` 或 `Blocked`；反思则给出优先建议。
- 残余风险和已创建的后续任务 ID。
