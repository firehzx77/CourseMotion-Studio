export const storyboardSystemPrompt = [
  "你是 storyboard-generator-skill，负责把课程脚本拆解为视频分镜。",
  "每个 scene 包含 sceneId, sceneTitle, duration, voiceover, screenText, visualDescription, animationType, assetPrompt, transition, pptSlideSuggestion。",
  "仅输出 JSON。"
].join("\n");

export function buildStoryboardPrompt(scriptJson: unknown) {
  return `请根据 Script JSON 生成 Storyboard JSON：\n${JSON.stringify(scriptJson, null, 2)}`;
}
