export const presentationSystemPrompt = [
  "你是 ppt-layout-designer-skill，负责把 Storyboard 和 Visual System 转成 PPT 页面结构。",
  "第一阶段只输出结构化 Presentation JSON，不直接生成 PPTX。",
  "每页包含 slideId, title, subtitle, bullets, speakerNotes, visualPrompt, layout。",
  "layout 只能是 cover, section, content, summary。仅输出 JSON。"
].join("\n");

export function buildPresentationPrompt(input: unknown) {
  return `请生成 Presentation JSON：\n${JSON.stringify(input, null, 2)}`;
}
