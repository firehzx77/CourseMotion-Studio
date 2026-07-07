"use client";

import { UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { useWorkflowStore } from "@/lib/store/workflow-store";

export function OutlineInput() {
  const outlineText = useWorkflowStore((state) => state.outlineText);
  const setOutlineText = useWorkflowStore((state) => state.setOutlineText);
  const setCourse = useWorkflowStore((state) => state.setCourse);
  const setStatus = useWorkflowStore((state) => state.setStatus);
  const addVersion = useWorkflowStore((state) => state.addVersion);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"]
    },
    multiple: false
  });

  async function parseOutline() {
    setStatus("正在解析大纲...");
    const formData = new FormData();
    formData.append("outlineText", outlineText);
    if (acceptedFiles[0]) {
      formData.append("file", acceptedFiles[0]);
    }

    const response = await fetch("/api/parse-outline", {
      method: "POST",
      body: formData
    });
    const data = await response.json();

    if (!response.ok) {
      setStatus(data.error || "大纲解析失败");
      return;
    }

    setOutlineText(data.outlineText);
    setCourse(data.course);
    addVersion("生成 Course JSON");
    setStatus("Course JSON 已生成，可进入大纲解析节点继续编辑");
  }

  return (
    <div className="grid min-h-0 flex-1 grid-rows-[auto_1fr] gap-4">
      <div
        {...getRootProps()}
        className="flex cursor-pointer items-center justify-between rounded-md border border-dashed border-border bg-card p-4 transition-colors hover:bg-muted"
      >
        <input {...getInputProps()} />
        <div className="flex items-center gap-3">
          <UploadCloud className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium">{isDragActive ? "松开后上传 Word 大纲" : "上传 Word 大纲"}</p>
            <p className="text-xs text-muted-foreground">{acceptedFiles[0]?.name || "支持 .docx；也可以只粘贴文本"}</p>
          </div>
        </div>
        <Button size="sm" variant="secondary" type="button">
          选择文件
        </Button>
      </div>
      <div className="flex min-h-0 flex-col">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold">原始课程大纲</h2>
          <Button size="sm" onClick={parseOutline} disabled={!outlineText.trim() && !acceptedFiles[0]}>
            解析为 Course JSON
          </Button>
        </div>
        <textarea
          className="min-h-[420px] flex-1 rounded-md border border-input bg-card p-3 text-sm leading-6 outline-none ring-ring focus:ring-2"
          placeholder="粘贴已有课程大纲文本。第一阶段不从零生成大纲，只做已有大纲的后处理。"
          value={outlineText}
          onChange={(event) => setOutlineText(event.target.value)}
        />
      </div>
    </div>
  );
}
