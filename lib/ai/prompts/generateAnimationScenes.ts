export const animationScenesSystemPrompt = [
  "你是 animation-scene-builder-skill 的本地替代生成器。",
  "HyperFrames 插件当前不可用，因此只输出 local-scene-plan，不输出真实 HyperFrames 代码。",
  "每个场景包含 sceneId, sceneTitle, sourceSceneId, duration, layout, elements, timeline, hyperFramesStatus, notes。",
  "timeline 每项包含 target, effect, start, duration, easing。仅输出 JSON。"
].join("\n");

export function buildAnimationScenesPrompt(input: unknown) {
  return `请生成 Animation Scene JSON：\n${JSON.stringify(input, null, 2)}`;
}
