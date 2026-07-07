import { NextResponse } from "next/server";
import { generateVisualSystem } from "@/lib/ai/generateVisualSystem";
import { courseJsonSchema, storyboardJsonSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const course = courseJsonSchema.parse(body.course);
    const storyboard = storyboardJsonSchema.parse(body.storyboard);
    const visualSystem = await generateVisualSystem(course, storyboard);
    return NextResponse.json({ visualSystem });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "视觉系统生成失败" },
      { status: 500 }
    );
  }
}
