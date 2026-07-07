import { presentationJsonSchema } from "@/lib/schemas";
import type { PresentationJson } from "@/lib/types/presentation";
import type { StoryboardJson } from "@/lib/types/storyboard";
import type { VisualSystemJson } from "@/lib/types/visual";
import { buildPresentationPrompt, presentationSystemPrompt } from "./prompts/generatePresentation";
import { requestJsonCompletion } from "./providers";

export async function generatePresentation(
  storyboard: StoryboardJson,
  visualSystem: VisualSystemJson | null
): Promise<PresentationJson> {
  const aiResult = await requestJsonCompletion({
    system: presentationSystemPrompt,
    user: buildPresentationPrompt({ storyboard, visualSystem })
  });

  if (aiResult) {
    return presentationJsonSchema.parse(aiResult);
  }

  const deckTitle = storyboard.scenes[0]?.screenText || storyboard.scenes[0]?.sceneTitle || "CourseMotion 课程演示";
  const contentScenes = storyboard.scenes.slice(1, -1);
  const closingScene = storyboard.scenes.at(-1);

  return presentationJsonSchema.parse({
    deckTitle,
    themeName: visualSystem?.styleName || "清爽商务科技风",
    slides: [
      {
        slideId: "slide_001",
        title: deckTitle,
        subtitle: "由 CourseMotion Studio 根据 Storyboard 生成",
        bullets: ["课程目标", "学习路径", "关键产出"],
        speakerNotes: storyboard.scenes[0]?.voiceover || "开场介绍课程主题与学习目标。",
        visualPrompt: storyboard.scenes[0]?.assetPrompt || "modern corporate training cover slide",
        layout: "cover"
      },
      ...contentScenes.map((scene, index) => ({
        slideId: `slide_${String(index + 2).padStart(3, "0")}`,
        title: scene.sceneTitle,
        subtitle: scene.duration,
        bullets: splitScreenText(scene.screenText, scene.visualDescription),
        speakerNotes: scene.voiceover,
        visualPrompt: scene.assetPrompt,
        layout: "content" as const
      })),
      {
        slideId: `slide_${String(contentScenes.length + 2).padStart(3, "0")}`,
        title: closingScene?.sceneTitle || "课程总结",
        subtitle: "关键收获与行动建议",
        bullets: splitScreenText(closingScene?.screenText || "关键收获", closingScene?.visualDescription || "行动建议"),
        speakerNotes: closingScene?.voiceover || "总结课程收获并提出行动建议。",
        visualPrompt: closingScene?.assetPrompt || "course summary slide",
        layout: "summary"
      }
    ]
  });
}

function splitScreenText(screenText: string, visualDescription: string) {
  const parts = screenText
    .split(/[；;、,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (parts.length >= 2) {
    return parts.slice(0, 5);
  }

  return [screenText || "核心概念", visualDescription || "画面说明", "讲师补充案例与互动"];
}
