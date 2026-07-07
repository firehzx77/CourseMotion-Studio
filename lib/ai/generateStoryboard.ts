import { storyboardJsonSchema } from "@/lib/schemas";
import type { ScriptJson } from "@/lib/types/script";
import type { StoryboardJson } from "@/lib/types/storyboard";
import { buildStoryboardPrompt, storyboardSystemPrompt } from "./prompts/generateStoryboard";
import { requestJsonCompletion } from "./providers";

export async function generateStoryboard(script: ScriptJson): Promise<StoryboardJson> {
  const aiResult = await requestJsonCompletion({
    system: storyboardSystemPrompt,
    user: buildStoryboardPrompt(script)
  });

  if (aiResult) {
    return storyboardJsonSchema.parse(aiResult);
  }

  const scenes = [
    {
      sceneId: "scene_001",
      sceneTitle: "课程开场",
      duration: "15s",
      voiceover: script.opening,
      screenText: "课程目标与学习路径",
      visualDescription: "标题区展示课程名，下方以三段流程线呈现学习路径。",
      animationType: "title-reveal",
      assetPrompt: "clean corporate training title slide, teal and amber accents, modern Chinese typography",
      transition: "fade",
      pptSlideSuggestion: "封面页 + 学习路径"
    },
    ...script.modules.map((module, index) => ({
      sceneId: `scene_${String(index + 2).padStart(3, "0")}`,
      sceneTitle: module.moduleTitle,
      duration: "45s",
      voiceover: module.script,
      screenText: module.moduleTitle,
      visualDescription: "左侧为模块标题和三条要点，右侧为案例或流程示意图。",
      animationType: "step-by-step",
      assetPrompt: `business training visual for ${module.moduleTitle}, modular layout, clear icons`,
      transition: "slide-left",
      pptSlideSuggestion: "模块讲解页"
    })),
    {
      sceneId: `scene_${String(script.modules.length + 2).padStart(3, "0")}`,
      sceneTitle: "课程总结",
      duration: "20s",
      voiceover: script.closing,
      screenText: "关键收获与行动建议",
      visualDescription: "总结卡片逐条出现，最后出现行动号召。",
      animationType: "checklist-build",
      assetPrompt: "course summary checklist, confident professional style, teal accent",
      transition: "fade-up",
      pptSlideSuggestion: "总结页"
    }
  ];

  return storyboardJsonSchema.parse({ scenes });
}
