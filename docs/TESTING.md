# Testing Guide

> **用途**：定义项目测试策略、核心能力覆盖、测试深度和 AI 辅助证据判断规则。

## 核心能力

| 能力 | 面向 owner 的承诺 | 必需证据 |
|------|-------------------|----------|
| `outline-input` | 用户可以粘贴文本或上传 `.docx` 作为已有课程大纲 | `/dashboard` 输入区、`/api/parse-outline` |
| `course-json` | 系统可以把大纲转换为 Course JSON | zod schema 校验、Course JSON 编辑器 |
| `script-json` | 系统可以根据 Course JSON 生成 Script JSON | `/api/generate-script`、Script JSON 编辑器 |
| `storyboard-json` | 系统可以根据 Script JSON 生成 Storyboard JSON | `/api/generate-storyboard`、分镜表格 |
| `visual-system` | 系统可以根据课程与分镜生成视觉系统建议 | `/api/generate-visual-system` |
| `asset-prompts` | 系统可以根据 Storyboard 生成素材 Prompt | `/api/generate-asset-prompts`、素材列表 |
| `export-center` | 用户可以导出 JSON 和 Markdown | 导出中心下载功能 |

## 测试深度

| 深度 | 使用场景 | 必需证据 |
|------|----------|----------|
| Quick | 文档-only 或窄范围 UI 文案变更 | 相关文件检查 |
| Bootstrap | 初始化项目或大范围骨架变更 | `npm run typecheck`、`npm run build`、手动打开 `/dashboard` |
| Standard | 普通功能变更 | typecheck/build + 受影响工作流手动检查 |
| Core regression | 触及核心能力 | Standard 证据 + 受影响核心能力逐项验证 |
| Release | 发布准备 | Core regression + release review |

## 常见测试类型

| 类型 | 证明什么 | 当前命令或证据 |
|------|----------|----------------|
| Type check | TypeScript 类型正确 | `npm run typecheck` |
| Production build | Next.js 可构建 | `npm run build` |
| Smoke test | 工作区可打开 | `npm run dev` 后访问 `/dashboard` |
| API fallback test | 无 API Key 时生成链路可用 | 粘贴大纲并依次生成节点 |
| Docs inspection | 文档事实与实现一致 | README、ARCHITECTURE、workflow、skill-map |

## AI 证据检查

AI Agent 完成实现后应报告：

- 运行的命令和结果。
- 手动检查路径。
- 受影响核心能力。
- 没有覆盖到的测试风险。
- 后续建议。
