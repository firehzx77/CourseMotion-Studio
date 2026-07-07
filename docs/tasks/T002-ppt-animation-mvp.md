# T002 补齐 PPT 与动画节点 MVP

## 元数据

| 字段 | 值 |
|------|----|
| 状态 | In progress |
| 类型 | Implementation |
| 优先级 | P0 |
| 大小 | M |
| Owner | Human user |
| Reviewer / Approver | Human user |
| 依赖 | T001 |

## 目标

用户反馈当前流程可到 06 素材 Prompt，但 07 PPT 生成尚不具备，08 动画生成的 HyperFrames 插件能力也不具备。本任务补齐可用 MVP：

- 07 生成 Presentation JSON。
- 07 导出基础 PPTX。
- 08 在无 HyperFrames 插件时生成本地 Animation Scene JSON。

## 范围

本任务会：

- 新增 Presentation / Animation TypeScript 类型和 zod schema。
- 新增 `/api/generate-presentation`、`/api/export-pptx`、`/api/generate-animation-scenes`。
- 使用 `pptxgenjs` 实现基础 PPTX 导出。
- 将 07/08 前端节点从占位升级为 JSON 编辑 + 预览。
- 更新导出中心和 AI 助手面板。
- 同步 workflow、skill-map、roadmap 和任务记录。

本任务不会：

- 输出真实 HyperFrames 代码。
- 实现复杂商务 PPT 模板、动画 PPT、Remotion 视频渲染、MP4、SRT 或 TTS。

## 验证

- 命令：`npm run typecheck`、`npm run build`
- 手动验证：从 06 后进入 07/08，生成 Presentation / Animation JSON，并导出 PPTX。
- 测试深度：Standard / Core regression
- 核心能力影响：PPT 生成、动画节点、导出中心

## 结果

- 主要改动：新增 Presentation / Animation 类型和 zod schema；新增 `generate-presentation`、`export-pptx`、`generate-animation-scenes` API；07/08 节点升级为 JSON 编辑与预览；导出中心支持 Presentation JSON、PPTX 和 Animation JSON。
- 验证结果：`npm run typecheck` 通过；`npm run build` 通过；短时 dev server API 烟雾测试生成 2 页 PPT 结构、2 个动画场景，并成功返回约 59KB 的 PPTX。
- 核心能力影响：PPT 生成、动画节点和导出中心均已扩展。
- 缺失测试覆盖：尚未加入自动化端到端测试；PPTX 内容质量仍需要人工打开检查版式。
- 改动文档：README、workflow、skill-map、roadmap、TASKS、T002 任务记录。
- 风险说明：HyperFrames 插件仍不可用，08 节点输出的是 `local-scene-plan`，不是可执行 HyperFrames 代码。
