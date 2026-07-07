import { assetPromptJsonSchema } from "@/lib/schemas";
import type { AssetPromptJson } from "@/lib/types/asset";
import type { StoryboardJson } from "@/lib/types/storyboard";
import { assetPromptsSystemPrompt, buildAssetPromptsPrompt } from "./prompts/generateAssetPrompts";
import { requestJsonCompletion } from "./providers";

export async function generateAssetPrompts(storyboard: StoryboardJson): Promise<AssetPromptJson> {
  const aiResult = await requestJsonCompletion({
    system: assetPromptsSystemPrompt,
    user: buildAssetPromptsPrompt(storyboard)
  });

  if (aiResult) {
    return assetPromptJsonSchema.parse(aiResult);
  }

  return assetPromptJsonSchema.parse({
    assets: storyboard.scenes.flatMap((scene, index) => [
      {
        assetId: `asset_${String(index + 1).padStart(3, "0")}_bg`,
        sceneId: scene.sceneId,
        assetType: "background",
        prompt: `${scene.assetPrompt}, clean background, no text, 16:9`,
        usage: `${scene.sceneTitle} 背景`
      },
      {
        assetId: `asset_${String(index + 1).padStart(3, "0")}_icon`,
        sceneId: scene.sceneId,
        assetType: "icon",
        prompt: `minimal line icon set for ${scene.sceneTitle}, teal accent, transparent background`,
        usage: `${scene.sceneTitle} 要点图标`
      }
    ])
  });
}
