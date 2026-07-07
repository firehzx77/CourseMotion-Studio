import { NextResponse } from "next/server";
import { generateStoryboard } from "@/lib/ai/generateStoryboard";
import { scriptJsonSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const script = scriptJsonSchema.parse(body.script);
    const storyboard = await generateStoryboard(script);
    return NextResponse.json({ storyboard });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Storyboard 生成失败" },
      { status: 500 }
    );
  }
}
