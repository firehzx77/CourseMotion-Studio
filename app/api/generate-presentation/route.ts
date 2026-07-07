import { NextResponse } from "next/server";
import { generatePresentation } from "@/lib/ai/generatePresentation";
import { storyboardJsonSchema, visualSystemSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const storyboard = storyboardJsonSchema.parse(body.storyboard);
    const visualSystem = body.visualSystem ? visualSystemSchema.parse(body.visualSystem) : null;
    const presentation = await generatePresentation(storyboard, visualSystem);
    return NextResponse.json({ presentation });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "PPT 页面结构生成失败" },
      { status: 500 }
    );
  }
}
