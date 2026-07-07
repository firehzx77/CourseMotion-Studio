import { animationSceneJsonSchema } from "@/lib/schemas";
import type { AnimationSceneJson } from "@/lib/types/animation";
import type { StoryboardJson } from "@/lib/types/storyboard";
import { animationScenesSystemPrompt, buildAnimationScenesPrompt } from "./prompts/generateAnimationScenes";
import { requestJsonCompletion } from "./providers";

export async function generateAnimationScenes(storyboard: StoryboardJson): Promise<AnimationSceneJson> {
  const aiResult = await requestJsonCompletion({
    system: animationScenesSystemPrompt,
    user: buildAnimationScenesPrompt({ storyboard })
  });

  if (aiResult) {
    return animationSceneJsonSchema.parse(aiResult);
  }

  return animationSceneJsonSchema.parse({
    scenes: storyboard.scenes.map((scene, index) => ({
      sceneId: `anim_${String(index + 1).padStart(3, "0")}`,
      sceneTitle: scene.sceneTitle,
      sourceSceneId: scene.sceneId,
      duration: scene.duration,
      layout: scene.pptSlideSuggestion || "content-layout",
      elements: ["background", "title", "key-points", "visual-asset"],
      timeline: [
        {
          target: "background",
          effect: "fade-in",
          start: "0s",
          duration: "0.6s",
          easing: "easeOut"
        },
        {
          target: "title",
          effect: scene.animationType || "slide-up",
          start: "0.2s",
          duration: "0.8s",
          easing: "easeOutCubic"
        },
        {
          target: "key-points",
          effect: "stagger-reveal",
          start: "0.9s",
          duration: "1.2s",
          easing: "easeOut"
        },
        {
          target: "visual-asset",
          effect: "scale-in",
          start: "1.2s",
          duration: "0.8s",
          easing: "easeOutBack"
        }
      ],
      hyperFramesStatus: "local-scene-plan",
      notes: "HyperFrames 插件当前不可用；此结果是可迁移到 HyperFrames 的本地动画场景计划。"
    }))
  });
}
