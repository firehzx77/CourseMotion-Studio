# CourseMotion Studio Workflow

> **用途**：说明第一阶段课程大纲后处理工作流的节点、输入、输出和占位边界。

## 总览

```text
已有课程大纲
→ 大纲解析
→ Course JSON
→ 课程脚本生成
→ Storyboard 分镜生成
→ Visual System 视觉系统生成
→ Asset Prompt 素材提示词生成
→ PPT 页面生成（占位）
→ Remotion 视频场景生成（占位）
→ HyperFrames 动画代码生成（占位）
→ 字幕/配音文本生成（占位）
→ 导出中心
```

## 第一阶段节点

| 节点 | 输入 | 输出 | 状态 |
|------|------|------|------|
| 01 大纲输入 | 粘贴文本或 `.docx` | 原始大纲文本 | 已实现 |
| 02 大纲解析 | 原始大纲文本 | Course JSON | 已实现 |
| 03 课程脚本 | Course JSON | Script JSON | 已实现 |
| 04 Storyboard 分镜 | Script JSON | Storyboard JSON | 已实现 |
| 05 视觉系统 | Course JSON + Storyboard JSON | Visual System JSON | 已实现 |
| 06 素材 Prompt | Storyboard JSON | Asset Prompt JSON | 已实现 |
| 07 PPT 生成 | Storyboard + Visual System | Presentation JSON / PPTX | 已实现基础版 |
| 08 动画生成 | Storyboard 场景 | Animation Scene JSON | 已实现本地场景计划；HyperFrames 插件未接入 |
| 09 视频生成 | 动画场景 | Remotion Components / MP4 | 第一阶段占位 |
| 10 字幕配音 | voiceover | SRT / TTS 音频 | 第一阶段占位 |
| 11 导出中心 | 当前工作流数据 | JSON / Markdown | 已实现；PPTX/MP4/SRT 占位 |

## 可编辑内容

- Course JSON：课程标题、目标用户、时长、目标、风格和模块结构。
- Script JSON：开场、模块讲解、案例讲解、互动引导、转场和总结。
- Storyboard JSON：分镜 ID、时长、旁白、屏幕文字、画面描述、动画类型、素材需求和 PPT 建议。
- Visual System JSON：风格名称、色彩、字体、图标、布局、动画和背景建议。
- Asset Prompt JSON：素材 ID、分镜 ID、素材类型、prompt 和用途。

## AI 生成策略

API Routes 会优先使用 `.env.local` 中配置的 OpenAI 或 DeepSeek。未配置 key 时，使用本地 fallback 生成器，保证工作流可演示、可编辑、可导出。

## 导出

第一阶段支持：

- `course.json`
- `script.json`
- `storyboard.json`
- `script.md`
- `storyboard.md`

后续阶段扩展：

- MP4
- SRT
- 素材包 ZIP

PPTX 当前为基础页面导出，支持标题、要点、视觉 Prompt 占位和讲师备注。商务模板、复杂排版和动画 PPT 留到后续阶段。
