"use client";

import { CheckCircle2, Download, RefreshCw, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scriptToMarkdown, storyboardToMarkdown } from "@/lib/export/markdown";
import { useWorkflowStore } from "@/lib/store/workflow-store";
import { downloadText, prettyJson } from "@/lib/utils";

const descriptions = {
  "outline-input": "粘贴已有课程大纲，或上传 .docx 后解析为 Course JSON。",
  "outline-parser": "检查并编辑 Course JSON，作为后续脚本与分镜的结构源。",
  script: "根据 Course JSON 生成讲师讲解脚本。",
  storyboard: "根据脚本拆分视频分镜，形成画面、旁白、动画和素材需求。",
  visual: "根据课程主题与分镜生成统一视觉系统建议。",
  assets: "根据 Storyboard 生成图片、图标、背景、人物、图表等素材 Prompt。",
  ppt: "根据 Storyboard 和视觉系统生成 PPT 页面结构，并可导出 PPTX。",
  animation: "HyperFrames 插件当前不可用；这里生成可迁移的本地动画场景计划。",
  video: "保留 Remotion 视频场景与渲染占位。",
  audio: "第一阶段保留字幕与 TTS 占位，后续接入 SRT / 配音。",
  export: "导出当前 Course JSON、Script JSON、Storyboard JSON 和 Markdown 文档。"
};

export function AssistantPanel() {
  const state = useWorkflowStore();

  async function postJson<T>(url: string, body: unknown): Promise<T | null> {
    state.setStatus("正在生成...");
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await response.json();

    if (!response.ok) {
      state.setStatus(data.error || "生成失败");
      return null;
    }

    return data as T;
  }

  async function generateCurrent() {
    if (state.activeStep === "script" && state.course) {
      const data = await postJson<{ script: typeof state.script }>("/api/generate-script", { course: state.course });
      if (data?.script) {
        state.setScript(data.script);
        state.addVersion("生成 Script JSON");
        state.setStatus("课程脚本已生成");
      }
    }

    if (state.activeStep === "storyboard" && state.script) {
      const data = await postJson<{ storyboard: typeof state.storyboard }>("/api/generate-storyboard", { script: state.script });
      if (data?.storyboard) {
        state.setStoryboard(data.storyboard);
        state.addVersion("生成 Storyboard JSON");
        state.setStatus("Storyboard 已生成");
      }
    }

    if (state.activeStep === "visual" && state.course && state.storyboard) {
      const data = await postJson<{ visualSystem: typeof state.visualSystem }>("/api/generate-visual-system", {
        course: state.course,
        storyboard: state.storyboard
      });
      if (data?.visualSystem) {
        state.setVisualSystem(data.visualSystem);
        state.addVersion("生成 Visual System");
        state.setStatus("视觉系统已生成");
      }
    }

    if (state.activeStep === "assets" && state.storyboard) {
      const data = await postJson<{ assets: typeof state.assets }>("/api/generate-asset-prompts", { storyboard: state.storyboard });
      if (data?.assets) {
        state.setAssets(data.assets);
        state.addVersion("生成 Asset Prompts");
        state.setStatus("素材 Prompt 已生成");
      }
    }

    if (state.activeStep === "ppt" && state.storyboard) {
      const data = await postJson<{ presentation: typeof state.presentation }>("/api/generate-presentation", {
        storyboard: state.storyboard,
        visualSystem: state.visualSystem
      });
      if (data?.presentation) {
        state.setPresentation(data.presentation);
        state.addVersion("生成 Presentation JSON");
        state.setStatus("PPT 页面结构已生成，可在导出中心下载 PPTX");
      }
    }

    if (state.activeStep === "animation" && state.storyboard) {
      const data = await postJson<{ animationScenes: typeof state.animationScenes }>("/api/generate-animation-scenes", {
        storyboard: state.storyboard
      });
      if (data?.animationScenes) {
        state.setAnimationScenes(data.animationScenes);
        state.addVersion("生成 Animation Scene JSON");
        state.setStatus("本地动画场景计划已生成；HyperFrames 插件暂未接入");
      }
    }
  }

  function validateCurrent() {
    const hasData = {
      "outline-input": Boolean(state.outlineText.trim()),
      "outline-parser": Boolean(state.course),
      script: Boolean(state.script),
      storyboard: Boolean(state.storyboard),
      visual: Boolean(state.visualSystem),
      assets: Boolean(state.assets),
      ppt: Boolean(state.presentation),
      animation: Boolean(state.animationScenes),
      video: true,
      audio: true,
      export: Boolean(state.course || state.script || state.storyboard)
    }[state.activeStep];

    state.setStatus(hasData ? "当前节点已有可用内容" : "当前节点缺少输入或生成结果");
  }

  function exportAll() {
    if (state.course) {
      downloadText("course.json", prettyJson(state.course), "application/json;charset=utf-8");
    }
    if (state.script) {
      downloadText("script.json", prettyJson(state.script), "application/json;charset=utf-8");
      downloadText("script.md", scriptToMarkdown(state.script), "text/markdown;charset=utf-8");
    }
    if (state.storyboard) {
      downloadText("storyboard.json", prettyJson(state.storyboard), "application/json;charset=utf-8");
      downloadText("storyboard.md", storyboardToMarkdown(state.storyboard), "text/markdown;charset=utf-8");
    }
    if (state.presentation) {
      downloadText("presentation.json", prettyJson(state.presentation), "application/json;charset=utf-8");
    }
    if (state.animationScenes) {
      downloadText("animation-scenes.json", prettyJson(state.animationScenes), "application/json;charset=utf-8");
    }
    state.setStatus("已触发当前可用文件下载");
  }

  const canGenerate =
    (state.activeStep === "script" && state.course) ||
    (state.activeStep === "storyboard" && state.script) ||
    (state.activeStep === "visual" && state.course && state.storyboard) ||
    (state.activeStep === "assets" && state.storyboard) ||
    (state.activeStep === "ppt" && state.storyboard) ||
    (state.activeStep === "animation" && state.storyboard);

  return (
    <aside className="flex h-full flex-col border-l border-border bg-card">
      <div className="border-b border-border p-4">
        <h2 className="text-sm font-semibold">AI 助手</h2>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">{descriptions[state.activeStep]}</p>
      </div>
      <div className="grid gap-2 p-4">
        <Button onClick={generateCurrent} disabled={!canGenerate}>
          <Sparkles className="h-4 w-4" />
          生成
        </Button>
        <Button variant="secondary" onClick={generateCurrent} disabled={!canGenerate}>
          <RefreshCw className="h-4 w-4" />
          重新生成
        </Button>
        <Button variant="secondary" onClick={validateCurrent}>
          <CheckCircle2 className="h-4 w-4" />
          校验
        </Button>
        <Button variant="secondary" onClick={() => state.setStatus("优化占位：后续会接入节点级改写 Prompt。")}>
          <Wand2 className="h-4 w-4" />
          优化
        </Button>
        <Button variant="secondary" onClick={exportAll}>
          <Download className="h-4 w-4" />
          导出
        </Button>
      </div>
      <div className="border-y border-border p-4">
        <p className="text-xs font-semibold">当前状态</p>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">{state.status}</p>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <p className="mb-2 text-xs font-semibold">版本记录占位</p>
        {state.versions.length ? (
          <ul className="grid gap-2">
            {state.versions.map((version) => (
              <li key={version} className="rounded-sm bg-muted px-2 py-1 text-xs text-muted-foreground">
                {version}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-muted-foreground">生成或编辑后会记录节点版本摘要。</p>
        )}
      </div>
    </aside>
  );
}
