"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scriptToMarkdown, storyboardToMarkdown } from "@/lib/export/markdown";
import { useWorkflowStore } from "@/lib/store/workflow-store";
import { downloadText, prettyJson } from "@/lib/utils";

export function ExportCenter() {
  const course = useWorkflowStore((state) => state.course);
  const script = useWorkflowStore((state) => state.script);
  const storyboard = useWorkflowStore((state) => state.storyboard);
  const presentation = useWorkflowStore((state) => state.presentation);
  const animationScenes = useWorkflowStore((state) => state.animationScenes);

  async function downloadPptx() {
    if (!presentation) {
      return;
    }

    const response = await fetch("/api/export-pptx", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ presentation })
    });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${presentation.deckTitle || "coursemotion"}.pptx`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  const items = [
    {
      label: "Course JSON",
      disabled: !course,
      onClick: () => course && downloadText("course.json", prettyJson(course), "application/json;charset=utf-8")
    },
    {
      label: "Script JSON",
      disabled: !script,
      onClick: () => script && downloadText("script.json", prettyJson(script), "application/json;charset=utf-8")
    },
    {
      label: "Storyboard JSON",
      disabled: !storyboard,
      onClick: () => storyboard && downloadText("storyboard.json", prettyJson(storyboard), "application/json;charset=utf-8")
    },
    {
      label: "Markdown 脚本",
      disabled: !script,
      onClick: () => script && downloadText("script.md", scriptToMarkdown(script), "text/markdown;charset=utf-8")
    },
    {
      label: "Markdown 分镜表",
      disabled: !storyboard,
      onClick: () => storyboard && downloadText("storyboard.md", storyboardToMarkdown(storyboard), "text/markdown;charset=utf-8")
    },
    {
      label: "Presentation JSON",
      disabled: !presentation,
      onClick: () => presentation && downloadText("presentation.json", prettyJson(presentation), "application/json;charset=utf-8")
    },
    {
      label: "导出 PPTX",
      disabled: !presentation,
      onClick: downloadPptx
    },
    {
      label: "Animation JSON",
      disabled: !animationScenes,
      onClick: () => animationScenes && downloadText("animation-scenes.json", prettyJson(animationScenes), "application/json;charset=utf-8")
    }
  ];

  return (
    <div className="grid gap-3">
      <h2 className="text-sm font-semibold">导出中心</h2>
      <div className="grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <Button key={item.label} variant="secondary" disabled={item.disabled} onClick={item.onClick}>
            <Download className="h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </div>
      <div className="rounded-md border border-border bg-card p-4 text-sm leading-6 text-muted-foreground">
        PPTX 已支持基础页面导出。MP4、SRT 和素材包导出将在后续阶段接入 Remotion render、FFmpeg 和 JSZip。
      </div>
    </div>
  );
}
