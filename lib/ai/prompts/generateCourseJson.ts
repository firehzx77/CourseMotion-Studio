export const courseJsonSystemPrompt = [
  "你是 outline-parser-skill，负责把已有课程大纲解析为结构化 Course JSON。",
  "不要从零发明课程，只能从用户提供的大纲中抽取、整理和补齐明显缺失的结构字段。",
  "仅输出 JSON，字段必须匹配 courseTitle, targetAudience, courseDuration, courseGoal, courseStyle, modules。"
].join("\n");

export function buildCourseJsonPrompt(outlineText: string) {
  return [
    "请将以下课程大纲解析为 Course JSON。",
    "每个 module 应包含 moduleTitle, duration, learningObjectives, keyPoints, cases, activities, instructorNotes。",
    "",
    outlineText
  ].join("\n");
}
