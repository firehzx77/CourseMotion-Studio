# Skill / Plugin / API Map

> **用途**：记录每个节点当前实现、未来 Skill、插件和 API 对应关系。

| 节点 | 当前实现 | 未来 Skill / 插件 / API |
|------|----------|--------------------------|
| 大纲输入 | `react-dropzone` + `mammoth.js` + 文本编辑器 | zod 校验、批量导入 |
| Outline Parser | `/api/parse-outline` + `generateCourseJson.ts` | `outline-parser-skill`、OpenAI API、DeepSeek API、JSON Editor |
| Script Generator | `/api/generate-script` + `generateScript.ts` | `course-script-writer-skill`、OpenAI API、DeepSeek API |
| Storyboard Generator | `/api/generate-storyboard` + `generateStoryboard.ts` | `storyboard-generator-skill`、OpenAI API、DeepSeek API |
| Visual System Generator | `/api/generate-visual-system` + `generateVisualSystem.ts` | `visual-system-skill`、Tailwind Design Token |
| Asset Prompt Generator | `/api/generate-asset-prompts` + `generateAssetPrompts.ts` | `asset-prompt-generator-skill`、GPT Image API、Midjourney API、Flux API、Iconify API、Lucide Icons |
| Presentation Engine | `/api/generate-presentation` + `/api/export-pptx` + `pptxgenjs` 基础导出 | `ppt-layout-designer-skill`、`business-ppt-design-skill`、Canva API、Google Slides API |
| Animation Scene Builder | `/api/generate-animation-scenes` 本地场景计划 | HyperFrames、`hyperframes`、`animation-scene-builder-skill`、Framer Motion、GSAP、Lottie |
| Video Engine | UI 占位 | Remotion、FFmpeg、`remotion-video-builder-skill` |
| Audio & Subtitle Engine | UI 占位 | Whisper API、ElevenLabs API、OpenAI TTS API、FFmpeg、`subtitle-generator-skill`、`voiceover-generator-skill` |
| Export Center | 前端 JSON / Markdown 下载 | FileSaver.js、JSZip、pptxgenjs、Remotion render、FFmpeg |

## Prompt 位置

所有 AI prompt 均放在：

```text
lib/ai/prompts/
```

组件不直接硬编码生成 prompt。

## Schema 位置

所有核心数据结构均有 zod schema：

```text
lib/schemas/
```

TypeScript 类型位于：

```text
lib/types/
```

## HyperFrames 当前状态

当前环境没有可调用的 HyperFrames 插件，因此 08 动画生成节点不会输出真实 HyperFrames 代码。它会输出 `hyperFramesStatus: "local-scene-plan"` 的 Animation Scene JSON，作为后续接入 HyperFrames 时的中间结构。
