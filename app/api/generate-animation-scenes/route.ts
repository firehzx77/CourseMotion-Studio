import { NextResponse } from "next/server";
import { generateAnimationScenes } from "@/lib/ai/generateAnimationScenes";
import { storyboardJsonSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const storyboard = storyboardJsonSchema.parse(body.storyboard);
    const animationScenes = await generateAnimationScenes(storyboard);
    return NextResponse.json({ animationScenes });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "动画场景结构生成失败" },
      { status: 500 }
    );
  }
}
