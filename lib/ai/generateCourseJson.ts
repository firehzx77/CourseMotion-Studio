import { courseJsonSchema } from "@/lib/schemas";
import type { CourseJson } from "@/lib/types/course";
import { buildCourseJsonPrompt, courseJsonSystemPrompt } from "./prompts/generateCourseJson";
import { requestJsonCompletion } from "./providers";

export async function generateCourseJson(outlineText: string): Promise<CourseJson> {
  const aiResult = await requestJsonCompletion({
    system: courseJsonSystemPrompt,
    user: buildCourseJsonPrompt(outlineText)
  });

  if (aiResult) {
    return courseJsonSchema.parse(aiResult);
  }

  return courseJsonSchema.parse(createFallbackCourseJson(outlineText));
}

function createFallbackCourseJson(outlineText: string) {
  const lines = outlineText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const title = lines[0]?.replace(/^#+\s*/, "") || "未命名课程";
  const moduleLines = lines.filter((line) => /^(第[一二三四五六七八九十\d]+|模块|\d+[.、])/.test(line));
  const modules = (moduleLines.length ? moduleLines : lines.slice(1, 5)).slice(0, 8).map((line, index) => ({
    moduleTitle: line.replace(/^(\d+[.、]\s*|模块[:：]?\s*)/, "") || `模块 ${index + 1}`,
    duration: "待确认",
    learningObjectives: [`理解${line}的核心概念`],
    keyPoints: [line],
    cases: [],
    activities: ["讲师提问：请学员结合自己的业务场景举例。"],
    instructorNotes: ["根据原始大纲补充案例、时间分配和互动节奏。"]
  }));

  return {
    courseTitle: title,
    targetAudience: "待确认",
    courseDuration: "待确认",
    courseGoal: "将已有课程大纲转化为可继续生产脚本、分镜与素材的结构化课程方案。",
    courseStyle: "专业、清晰、可落地",
    modules
  };
}
