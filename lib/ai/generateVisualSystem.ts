import { visualSystemSchema } from "@/lib/schemas";
import type { CourseJson } from "@/lib/types/course";
import type { StoryboardJson } from "@/lib/types/storyboard";
import type { VisualSystemJson } from "@/lib/types/visual";
import { buildVisualSystemPrompt, visualSystemPrompt } from "./prompts/generateVisualSystem";
import { requestJsonCompletion } from "./providers";

export async function generateVisualSystem(course: CourseJson, storyboard: StoryboardJson): Promise<VisualSystemJson> {
  const input = { course, storyboard };
  const aiResult = await requestJsonCompletion({
    system: visualSystemPrompt,
    user: buildVisualSystemPrompt(input)
  });

  if (aiResult) {
    return visualSystemSchema.parse(aiResult);
  }

  return visualSystemSchema.parse({
    styleName: "清爽商务科技风",
    primaryColor: "#0f766e",
    secondaryColor: "#f59e0b",
    fontStyle: "微软雅黑 / Inter 风格的现代无衬线字体，标题加粗，正文保持高可读性",
    iconStyle: "Lucide 线性图标，搭配少量实心重点符号",
    layoutStyle: "左侧结构信息，右侧视觉示意；表格与分镜采用紧凑工作台布局",
    animationStyle: "轻量位移、渐显、步骤构建，避免过度炫技",
    backgroundStyle: "浅灰背景、白色工作区、细分隔线与柔和强调色"
  });
}
