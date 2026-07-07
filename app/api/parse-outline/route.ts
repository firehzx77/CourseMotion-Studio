import { NextResponse } from "next/server";
import mammoth from "mammoth";
import { generateCourseJson } from "@/lib/ai/generateCourseJson";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let outlineText = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file");
      const text = formData.get("outlineText");

      if (typeof text === "string") {
        outlineText = text;
      }

      if (file instanceof File) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const parsed = await mammoth.extractRawText({ buffer });
        outlineText = parsed.value || outlineText;
      }
    } else {
      const body = await request.json();
      outlineText = String(body.outlineText || "");
    }

    if (!outlineText.trim()) {
      return NextResponse.json({ error: "请先粘贴课程大纲或上传 Word 文档。" }, { status: 400 });
    }

    const course = await generateCourseJson(outlineText);
    return NextResponse.json({ outlineText, course });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "大纲解析失败" },
      { status: 500 }
    );
  }
}
