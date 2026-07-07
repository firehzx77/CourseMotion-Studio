import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    status: "placeholder",
    message: "第一阶段导出在前端完成。未来这里会承接 PPTX、MP4、SRT 和素材包导出。",
    requested: body
  });
}
