import { NextResponse } from "next/server";
import pptxgen from "pptxgenjs";
import { presentationJsonSchema } from "@/lib/schemas";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const presentation = presentationJsonSchema.parse(body.presentation);
    const pptx = new pptxgen();
    pptx.layout = "LAYOUT_WIDE";
    pptx.author = "CourseMotion Studio";
    pptx.subject = "CourseMotion generated presentation";
    pptx.title = presentation.deckTitle;
    pptx.company = "CourseMotion Studio";
    pptx.theme = {
      headFontFace: "Microsoft YaHei",
      bodyFontFace: "Microsoft YaHei"
    };

    presentation.slides.forEach((slideData, index) => {
      const slide = pptx.addSlide();
      slide.background = { color: index === 0 ? "0F766E" : "F8FAFC" };
      const titleColor = index === 0 ? "FFFFFF" : "0F172A";
      const bodyColor = index === 0 ? "E0F2F1" : "334155";

      slide.addText(slideData.title, {
        x: 0.55,
        y: index === 0 ? 1.35 : 0.45,
        w: 8.4,
        h: 0.65,
        fontFace: "Microsoft YaHei",
        fontSize: index === 0 ? 30 : 24,
        bold: true,
        color: titleColor,
        margin: 0
      });

      if (slideData.subtitle) {
        slide.addText(slideData.subtitle, {
          x: 0.6,
          y: index === 0 ? 2.15 : 1.1,
          w: 7.8,
          h: 0.35,
          fontFace: "Microsoft YaHei",
          fontSize: 12,
          color: bodyColor,
          margin: 0
        });
      }

      slideData.bullets.slice(0, 6).forEach((bullet, bulletIndex) => {
        slide.addText(bullet, {
          x: 0.8,
          y: (index === 0 ? 3.0 : 1.8) + bulletIndex * 0.48,
          w: 6.8,
          h: 0.28,
          fontFace: "Microsoft YaHei",
          fontSize: 14,
          color: bodyColor,
          bullet: { type: "bullet" },
          margin: 0
        });
      });

      slide.addShape(pptx.ShapeType.rect, {
        x: 9.2,
        y: 0.7,
        w: 3.1,
        h: 5.6,
        fill: { color: index === 0 ? "134E4A" : "FFFFFF", transparency: 4 },
        line: { color: index === 0 ? "5EEAD4" : "CBD5E1" }
      });
      slide.addText(slideData.visualPrompt || "Visual prompt", {
        x: 9.45,
        y: 1.0,
        w: 2.6,
        h: 4.7,
        fontFace: "Microsoft YaHei",
        fontSize: 10,
        color: index === 0 ? "CCFBF1" : "475569",
        fit: "shrink",
        valign: "middle",
        margin: 0.08
      });

      slide.addNotes(slideData.speakerNotes || "");
    });

    const buffer = await pptx.write({ outputType: "arraybuffer" });
    const blob = new Blob([buffer as BlobPart], {
      type: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    });
    return new NextResponse(blob, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "Content-Disposition": `attachment; filename="${encodeURIComponent(presentation.deckTitle || "coursemotion")}.pptx"`
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "PPTX 导出失败" },
      { status: 500 }
    );
  }
}
