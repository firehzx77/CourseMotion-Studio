"use client";

import {
  Boxes,
  Clapperboard,
  Code2,
  Download,
  FileInput,
  FileJson,
  FileText,
  Images,
  Mic2,
  Palette,
  Presentation,
  Video
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useWorkflowStore, type WorkflowStepId } from "@/lib/store/workflow-store";

export const workflowSteps: Array<{ id: WorkflowStepId; label: string; description: string; icon: React.ComponentType<{ className?: string }> }> = [
  { id: "outline-input", label: "01 大纲输入", description: "粘贴文本 / 上传 Word", icon: FileInput },
  { id: "outline-parser", label: "02 大纲解析", description: "Course JSON", icon: FileJson },
  { id: "script", label: "03 课程脚本", description: "讲师讲解脚本", icon: FileText },
  { id: "storyboard", label: "04 Storyboard 分镜", description: "视频镜头拆解", icon: Clapperboard },
  { id: "visual", label: "05 视觉系统", description: "风格与设计 token", icon: Palette },
  { id: "assets", label: "06 素材 Prompt", description: "图片 / 图标 / 背景", icon: Images },
  { id: "ppt", label: "07 PPT 生成", description: "页面结构 / PPTX", icon: Presentation },
  { id: "animation", label: "08 动画生成", description: "本地场景计划", icon: Code2 },
  { id: "video", label: "09 视频生成", description: "Remotion 占位", icon: Video },
  { id: "audio", label: "10 字幕配音", description: "字幕 / TTS 占位", icon: Mic2 },
  { id: "export", label: "11 导出中心", description: "JSON / Markdown", icon: Download }
];

export function WorkflowNav() {
  const activeStep = useWorkflowStore((state) => state.activeStep);
  const setActiveStep = useWorkflowStore((state) => state.setActiveStep);

  return (
    <nav className="flex h-full flex-col border-r border-border bg-card">
      <div className="border-b border-border p-4">
        <div className="flex items-center gap-2">
          <Boxes className="h-5 w-5 text-primary" />
          <div>
            <h1 className="text-sm font-bold leading-tight">CourseMotion Studio</h1>
            <p className="text-xs text-muted-foreground">课动工坊</p>
          </div>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        {workflowSteps.map((step) => {
          const Icon = step.icon;
          const active = activeStep === step.id;
          return (
            <button
              key={step.id}
              className={cn(
                "mb-1 grid w-full grid-cols-[28px_1fr] gap-2 rounded-md px-2 py-2 text-left transition-colors",
                active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
              )}
              onClick={() => setActiveStep(step.id)}
              type="button"
            >
              <Icon className={cn("mt-0.5 h-4 w-4", active ? "text-primary-foreground" : "text-muted-foreground")} />
              <span>
                <span className="block text-xs font-semibold">{step.label}</span>
                <span className={cn("block text-[11px]", active ? "text-primary-foreground/80" : "text-muted-foreground")}>
                  {step.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
