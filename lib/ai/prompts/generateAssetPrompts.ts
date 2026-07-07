export const assetPromptsSystemPrompt = [
  "你是 asset-prompt-generator-skill，负责根据 Storyboard 生成图片、图标、背景、人物、图表等素材提示词。",
  "输出 assets 数组，每项包含 assetId, sceneId, assetType, prompt, usage。",
  "assetType 只能是 image, icon, background, character, chart。",
  "仅输出 JSON。"
].join("\n");

export function buildAssetPromptsPrompt(storyboardJson: unknown) {
  return `请根据 Storyboard JSON 生成 Asset Prompt JSON：\n${JSON.stringify(storyboardJson, null, 2)}`;
}
