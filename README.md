# CourseMotion Studio（课动工坊）

CourseMotion Studio 是一个课程大纲后处理工作流平台。它不负责从零生成课程大纲，而是把已有课程大纲继续转化为 Course JSON、课程脚本、Storyboard 分镜、视觉系统、素材 Prompt，并提供 JSON / Markdown 导出。

## 第一阶段 MVP

已实现：

- 粘贴课程大纲文本。
- 上传 Word `.docx` 并用 `mammoth.js` 提取大纲文本。
- 将大纲解析为结构化 Course JSON。
- 根据 Course JSON 生成 Script JSON。
- 根据 Script JSON 生成 Storyboard JSON。
- 根据 Storyboard 生成 Visual System JSON。
- 根据 Storyboard 生成 Asset Prompt JSON。
- 项目工作区 UI：左侧 11 个节点导航、中间编辑/预览、右侧 AI 助手面板。
- JSON 编辑器、分镜表格、素材 Prompt 列表。
- 导出 Course JSON、Script JSON、Storyboard JSON、Markdown 脚本、Markdown 分镜表。
- Presentation JSON 生成与基础 PPTX 导出。
- Animation Scene JSON 本地场景计划生成；HyperFrames 插件未接入时不会伪装成真实 HyperFrames 代码。
- Remotion、字幕/TTS、素材包导出接口占位。

## 技术栈

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui 风格的本地基础组件
- Node.js API Routes
- zod
- mammoth.js
- zustand
- react-dropzone
- OpenAI API 或 DeepSeek API，可选

无 API Key 时，应用会使用本地确定性生成器产出演示数据，方便先跑通工作流。

## 本地运行

```sh
npm install
npm run dev
```

打开：

```text
http://localhost:3000/dashboard
```

验证：

```sh
npm run typecheck
npm run build
```

## 环境变量

复制 `.env.example` 为 `.env.local`，按需选择一个 provider：

```sh
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini

DEEPSEEK_API_KEY=
DEEPSEEK_MODEL=deepseek-chat
```

如果两个 key 都为空，API Routes 会返回本地 fallback 结果。

## 项目结构

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

## 工作流节点

1. 大纲输入
2. 大纲解析
3. 课程脚本
4. Storyboard 分镜
5. 视觉系统
6. 素材 Prompt
7. PPT 生成，占位
8. 动画生成，占位
9. 视频生成，占位
10. 字幕配音，占位
11. 导出中心

## 后续开发建议

- 增加真正的版本记录与节点历史。
- 为 JSON 编辑器加入 schema-aware 校验和差异对比。
- 扩展商务 PPT 模板、复杂版式和动画 PPT。
- 接入真实 HyperFrames 插件，把本地 Animation Scene JSON 转为可执行动画代码。
- 接入 Remotion 预览与 MP4 渲染。
- 接入 SRT、TTS 和字幕时间轴。
- 增加项目保存、素材库和多课程管理。
