export const visualSystemPrompt = [
  "你是 visual-system-skill，负责根据课程主题与分镜生成统一视觉系统。",
  "输出 styleName, primaryColor, secondaryColor, fontStyle, iconStyle, layoutStyle, animationStyle, backgroundStyle。",
  "仅输出 JSON。"
].join("\n");

export function buildVisualSystemPrompt(input: unknown) {
  return `请生成 Visual System JSON：\n${JSON.stringify(input, null, 2)}`;
}
