import type { PresentationJson } from "@/lib/types/presentation";

export function PresentationPreview({ presentation }: { presentation: PresentationJson | null }) {
  if (!presentation?.slides.length) {
    return <p className="rounded-md border border-border bg-card p-4 text-sm text-muted-foreground">还没有 PPT 页面结构。</p>;
  }

  return (
    <div className="grid gap-3">
      {presentation.slides.map((slide) => (
        <article key={slide.slideId} className="rounded-md border border-border bg-card p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold">{slide.title}</h3>
            <span className="rounded-sm bg-muted px-2 py-1 text-[11px] text-muted-foreground">{slide.layout}</span>
          </div>
          {slide.subtitle ? <p className="text-xs text-muted-foreground">{slide.subtitle}</p> : null}
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
            {slide.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">讲师备注：{slide.speakerNotes}</p>
        </article>
      ))}
    </div>
  );
}
