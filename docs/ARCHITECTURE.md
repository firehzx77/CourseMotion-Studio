# Architecture and Development Guide

> **用途**：作为 `CourseMotion Studio` 的技术事实来源，记录栈、目录、命令、边界、变更入口和文档同步要求。

## 项目目的

CourseMotion Studio 是一个 Next.js + TypeScript 的课程大纲后处理工作流平台。它把已有课程大纲转成 Course JSON、Script JSON、Storyboard JSON、Visual System JSON、Asset Prompt JSON，并支持 JSON / Markdown 导出。

## 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 主要平台 | Web app | Next.js App Router |
| 栈 | TypeScript / React / Tailwind CSS | 工作区式前端 UI |
| 前端 | React, Zustand, react-dropzone, lucide-react | 11 节点导航、中间编辑区、右侧助手面板 |
| 后端 | Next.js API Routes | AI 生成接口与 Word 解析 |
| 数据 | zod schema + JSON | 第一阶段无数据库，状态保存在前端内存中 |
| AI Provider | OpenAI / DeepSeek / local fallback | `.env.local` 配置 key；无 key 时使用确定性 fallback |

## 目录地图

```text
app/
├── api/
│   ├── parse-outline/
│   ├── generate-script/
│   ├── generate-storyboard/
│   ├── generate-visual-system/
│   ├── generate-asset-prompts/
│   └── export/
└── dashboard/
components/
├── assistant-panel/
├── editor/
├── export/
├── preview/
├── ui/
└── workflow/
lib/
├── ai/
│   └── prompts/
├── export/
├── schemas/
├── store/
├── types/
└── utils.ts
docs/
├── ARCHITECTURE.md
├── workflow.md
├── skill-map.md
└── roadmap.md
```

## 模块与职责

| 路径 | 职责 | 主要数据读写 |
|------|------|--------------|
| `app/dashboard/page.tsx` | 工作区页面入口 | 组合导航、工作区、助手面板 |
| `app/api/parse-outline/route.ts` | 大纲输入与 Word 解析 | `.docx`、outline text、Course JSON |
| `app/api/generate-*/route.ts` | 节点生成 API | Course、Script、Storyboard、Visual、Asset JSON |
| `components/workflow/` | 工作区导航与节点渲染 | Zustand workflow state |
| `components/editor/` | 文本与 JSON 编辑器 | 用户编辑输入 |
| `components/assistant-panel/` | 生成、重新生成、优化占位、校验、导出 | 调用 API / 下载文件 |
| `lib/ai/` | AI provider、fallback 生成器和 prompt | OpenAI / DeepSeek / local fallback |
| `lib/schemas/` | zod schema | 核心数据结构校验 |
| `lib/types/` | TypeScript 类型 | 核心数据结构 |
| `lib/export/` | Markdown 导出转换 | Script / Storyboard Markdown |

## API 契约

| Endpoint | Method | 输入 | 输出 |
|----------|--------|------|------|
| `/api/parse-outline` | POST | `multipart/form-data` with `outlineText` and optional `file`, or JSON `{ outlineText }` | `{ outlineText, course }` |
| `/api/generate-script` | POST | `{ course }` | `{ script }` |
| `/api/generate-storyboard` | POST | `{ script }` | `{ storyboard }` |
| `/api/generate-visual-system` | POST | `{ course, storyboard }` | `{ visualSystem }` |
| `/api/generate-asset-prompts` | POST | `{ storyboard }` | `{ assets }` |
| `/api/export` | POST | 任意导出请求 | 第一阶段占位响应 |

## 开发工作流

### 前置条件

- Node.js 18+。
- `npm install` 安装依赖。
- 可选：复制 `.env.example` 为 `.env.local` 并配置 OpenAI 或 DeepSeek key。

### 常用命令

```sh
npm run dev
npm run typecheck
npm run build
```

### 验证清单

- `/dashboard` 可打开。
- 粘贴大纲后可生成 Course JSON。
- 可继续生成 Script、Storyboard、Visual System 和 Asset Prompts。
- 导出中心可下载 JSON / Markdown。
- 无 API Key 时 fallback 仍可跑通工作流。

## 设计决策

- 第一阶段不引入数据库，工作流状态由 Zustand 保存在前端内存中，降低启动复杂度。
- AI prompt 集中在 `lib/ai/prompts/`，组件不硬编码 prompt。
- 所有核心结构使用 zod schema，API Route 入参和 AI 输出均校验。
- 无 API Key 时使用本地 fallback，保证 MVP 可演示。
- PPTX、HyperFrames、Remotion、TTS 和字幕只做占位，避免第一阶段范围失控。

## 安全边界

- API Key 只通过 `.env.local` 提供，不写入组件或提交到仓库。
- 第一阶段不处理账号、支付、云端存储或个人敏感数据。
- 引入外部素材生成、视频渲染、TTS 或云端存储前，需要重新评估成本、隐私和失败恢复。
