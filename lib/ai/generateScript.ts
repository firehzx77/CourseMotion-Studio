import { scriptJsonSchema } from "@/lib/schemas";
import type { CourseJson } from "@/lib/types/course";
import type { ScriptJson } from "@/lib/types/script";
import { buildScriptPrompt, scriptSystemPrompt } from "./prompts/generateScript";
import { requestJsonCompletion } from "./providers";

export async function generateScript(course: CourseJson): Promise<ScriptJson> {
  const aiResult = await requestJsonCompletion({
    system: scriptSystemPrompt,
    user: buildScriptPrompt(course)
  });

  if (aiResult) {
    return scriptJsonSchema.parse(aiResult);
  }

  return scriptJsonSchema.parse({
    opening: `欢迎来到《${course.courseTitle || "本课程"}》。本节课会围绕课程目标逐步展开，帮助学员把关键概念转化为可执行行动。`,
    modules: course.modules.map((module, index) => ({
      moduleTitle: module.moduleTitle,
      script: `第 ${index + 1} 部分，我们聚焦“${module.moduleTitle}”。讲师先解释核心概念，再结合业务场景说明应用方法。重点包括：${module.keyPoints.join("、") || "待补充"}。`,
      caseExplanation: module.cases[0] || "这里可以补充一个贴近学员工作的真实案例，用来说明概念如何落地。",
      interactionPrompt: module.activities[0] || "请学员思考：这个模块的内容可以怎样用于自己的工作？",
      transition: `接下来进入“${course.modules[index + 1]?.moduleTitle || "课程总结"}”。`
    })),
    closing: "最后回顾本课程的关键收获，并邀请学员选择一个具体场景完成课后行动。"
  });
}
