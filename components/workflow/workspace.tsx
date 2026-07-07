"use client";

import { AssetList } from "@/components/preview/asset-list";
import { AnimationSceneList } from "@/components/preview/animation-scene-list";
import { ExportCenter } from "@/components/export/export-center";
import { JsonEditor } from "@/components/editor/json-editor";
import { OutlineInput } from "@/components/editor/outline-input";
import { PlaceholderNode } from "@/components/preview/placeholder-node";
import { PresentationPreview } from "@/components/preview/presentation-preview";
import { StoryboardTable } from "@/components/preview/storyboard-table";
import { useWorkflowStore } from "@/lib/store/workflow-store";
import type { AssetPromptJson } from "@/lib/types/asset";
import type { AnimationSceneJson } from "@/lib/types/animation";
import type { CourseJson } from "@/lib/types/course";
import type { PresentationJson } from "@/lib/types/presentation";
import type { ScriptJson } from "@/lib/types/script";
import type { StoryboardJson } from "@/lib/types/storyboard";
import type { VisualSystemJson } from "@/lib/types/visual";

export function Workspace() {
  const state = useWorkflowStore();

  return (
    <main className="flex h-full min-w-0 flex-col">
      <header className="border-b border-border bg-background px-5 py-3">
        <p className="text-xs text-muted-foreground">课程大纲后处理工作流平台</p>
        <h1 className="text-xl font-semibold">CourseMotion Studio · 课动工坊</h1>
      </header>
      <section className="min-h-0 flex-1 overflow-y-auto p-5">
        {state.activeStep === "outline-input" ? <OutlineInput /> : null}
        {state.activeStep === "outline-parser" ? (
          <JsonEditor<CourseJson>
            title="Course JSON"
            value={state.course}
            emptyText="先在 01 大纲输入中解析课程大纲。"
            onChange={state.setCourse}
          />
        ) : null}
        {state.activeStep === "script" ? (
          <JsonEditor<ScriptJson>
            title="Script JSON"
            value={state.script}
            emptyText="先生成课程脚本，或手动粘贴 Script JSON。"
            onChange={state.setScript}
          />
        ) : null}
        {state.activeStep === "storyboard" ? (
          <div className="grid gap-4">
            <JsonEditor<StoryboardJson>
              title="Storyboard JSON"
              value={state.storyboard}
              emptyText="先生成 Storyboard，或手动粘贴 Storyboard JSON。"
              onChange={state.setStoryboard}
            />
            <StoryboardTable storyboard={state.storyboard} />
          </div>
        ) : null}
        {state.activeStep === "visual" ? (
          <JsonEditor<VisualSystemJson>
            title="Visual System JSON"
            value={state.visualSystem}
            emptyText="先生成视觉系统，或手动粘贴 Visual System JSON。"
            onChange={state.setVisualSystem}
          />
        ) : null}
        {state.activeStep === "assets" ? (
          <div className="grid gap-4">
            <JsonEditor<AssetPromptJson>
              title="Asset Prompt JSON"
              value={state.assets}
              emptyText="先生成素材 Prompt，或手动粘贴 Asset JSON。"
              onChange={state.setAssets}
            />
            <AssetList assets={state.assets} />
          </div>
        ) : null}
        {state.activeStep === "ppt" ? (
          <div className="grid gap-4">
            <JsonEditor<PresentationJson>
              title="Presentation JSON"
              value={state.presentation}
              emptyText="先生成 PPT 页面结构，或手动粘贴 Presentation JSON。"
              onChange={state.setPresentation}
            />
            <PresentationPreview presentation={state.presentation} />
          </div>
        ) : null}
        {state.activeStep === "animation" ? (
          <div className="grid gap-4">
            <JsonEditor<AnimationSceneJson>
              title="Animation Scene JSON"
              value={state.animationScenes}
              emptyText="先生成动画场景结构，或手动粘贴 Animation Scene JSON。"
              onChange={state.setAnimationScenes}
            />
            <AnimationSceneList animationScenes={state.animationScenes} />
          </div>
        ) : null}
        {state.activeStep === "video" ? (
          <PlaceholderNode title="视频生成节点" description="后续将把 Storyboard 场景转换为 Remotion Components，并支持视频预览和 MP4 导出。" />
        ) : null}
        {state.activeStep === "audio" ? (
          <PlaceholderNode title="字幕配音节点" description="第一阶段保留 voiceover 文本；后续将生成 SRT、调用 TTS 并自动匹配字幕时间轴。" />
        ) : null}
        {state.activeStep === "export" ? <ExportCenter /> : null}
      </section>
    </main>
  );
}
