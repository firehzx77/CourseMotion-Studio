import type { ScriptJson } from "@/lib/types/script";
import type { StoryboardJson } from "@/lib/types/storyboard";

export function scriptToMarkdown(script: ScriptJson) {
  const moduleSections = script.modules
    .map(
      (module, index) => [
        `## ${index + 1}. ${module.moduleTitle}`,
        "",
        "### 讲解脚本",
        module.script,
        "",
        "### 案例讲解",
        module.caseExplanation,
        "",
        "### 互动引导",
        module.interactionPrompt,
        "",
        "### 转场",
        module.transition
      ].join("\n")
    )
    .join("\n\n");

  return ["# 课程脚本", "", "## 开场", script.opening, "", moduleSections, "", "## 总结", script.closing].join("\n");
}

export function storyboardToMarkdown(storyboard: StoryboardJson) {
  const rows = storyboard.scenes.map((scene) =>
    [
      `| ${scene.sceneId} | ${scene.sceneTitle} | ${scene.duration} | ${escapeCell(scene.screenText)} | ${escapeCell(scene.animationType)} |`
    ].join("")
  );

  return [
    "# Storyboard 分镜表",
    "",
    "| Scene ID | 标题 | 时长 | 屏幕文字 | 动画类型 |",
    "|----------|------|------|----------|----------|",
    ...rows,
    "",
    "## 分镜详情",
    "",
    ...storyboard.scenes.flatMap((scene) => [
      `### ${scene.sceneId} ${scene.sceneTitle}`,
      "",
      `- 旁白：${scene.voiceover}`,
      `- 画面描述：${scene.visualDescription}`,
      `- 素材需求：${scene.assetPrompt}`,
      `- 转场：${scene.transition}`,
      `- PPT 建议：${scene.pptSlideSuggestion}`,
      ""
    ])
  ].join("\n");
}

function escapeCell(value: string) {
  return value.replace(/\|/g, "\\|").replace(/\n/g, " ");
}
