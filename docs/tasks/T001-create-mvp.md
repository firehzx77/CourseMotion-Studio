# T001 创建第一阶段 MVP

## 元数据

| 字段 | 值 |
|------|----|
| 状态 | In progress |
| 类型 | Implementation |
| 优先级 | P0 |
| 大小 | L |
| Owner | Human user |
| Reviewer / Approver | Human user |
| 依赖 | None |

## 目标

根据用户提供的项目说明，创建 CourseMotion Studio（课动工坊）第一阶段 MVP。

## 范围

本任务完成：

- Next.js / React / TypeScript / Tailwind 项目初始化。
- 工作区式 UI。
- 大纲文本输入和 Word `.docx` 解析。
- Course JSON、Script JSON、Storyboard JSON、Visual System JSON、Asset Prompt JSON 生成接口。
- zod schema 和 TypeScript 类型。
- prompt 集中管理。
- JSON 编辑、分镜表格、素材列表。
- JSON / Markdown 导出。
- PPTX、Remotion、HyperFrames、TTS、字幕占位。
- README、architecture、workflow、skill-map、roadmap 等文档。

本任务不做：

- 完整 PPTX 生成。
- 完整 Remotion 视频渲染。
- 完整 HyperFrames 动画代码生成。
- TTS 配音、SRT 时间轴和素材包生成。
- 账号系统、云端存储、多课程数据库。

## 验证

- 命令：`npm run typecheck`、`npm run build`
- 手动验证：运行 `npm run dev` 后访问 `/dashboard`
- 测试深度：Bootstrap
- 核心能力影响：全部第一阶段核心能力
- 缺失测试：尚未加入自动化 UI/API 测试，后续补充

## 结果

- 主要改动：创建 Next.js/TypeScript/Tailwind 工作区，完成大纲输入、Word 解析、五个生成 API、工作流 UI、JSON 编辑、分镜预览、素材列表、JSON/Markdown 导出和项目文档。
- 验证结果：`npm run typecheck` 通过；`npm run build` 通过；短时 dev server 下 `/dashboard` 返回 200；`/api/parse-outline` fallback 测试返回课程标题和 3 个模块。
- 核心能力影响：覆盖第一阶段全部核心能力。
- 缺失测试覆盖：尚未加入自动化 UI/API 测试。
- 改动文档：README、AGENTS、PRODUCT、ARCHITECTURE、TESTING、TASKS、workflow、skill-map、roadmap。
- 风险说明：当前执行环境会清理工具启动的后台 dev server，因此无法在本回合保持服务常驻；用户本地可运行 `npm run dev` 启动。
