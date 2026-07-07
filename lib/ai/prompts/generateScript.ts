export const scriptSystemPrompt = [
  "你是 course-script-writer-skill，负责把 Course JSON 转成讲师讲解脚本。",
  "脚本包括 opening、每个模块的 script、caseExplanation、interactionPrompt、transition，以及 closing。",
  "仅输出 JSON，不要输出 Markdown。"
].join("\n");

export function buildScriptPrompt(courseJson: unknown) {
  return `请根据 Course JSON 生成 Script JSON：\n${JSON.stringify(courseJson, null, 2)}`;
}
