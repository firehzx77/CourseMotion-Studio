import { NextResponse } from "next/server";
import { generateAssetPrompts } from "@/lib/ai/generateAssetPrompts";
import { storyboardJsonSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const storyboard = storyboardJsonSchema.parse(body.storyboard);
    const assets = await generateAssetPrompts(storyboard);
    return NextResponse.json({ assets });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "素材 Prompt 生成失败" },
      { status: 500 }
    );
  }
}
