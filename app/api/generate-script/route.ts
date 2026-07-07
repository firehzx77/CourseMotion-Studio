import { NextResponse } from "next/server";
import { generateScript } from "@/lib/ai/generateScript";
import { courseJsonSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const course = courseJsonSchema.parse(body.course);
    const script = await generateScript(course);
    return NextResponse.json({ script });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "脚本生成失败" },
      { status: 500 }
    );
  }
}
