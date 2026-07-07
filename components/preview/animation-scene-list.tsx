import type { AnimationSceneJson } from "@/lib/types/animation";

export function AnimationSceneList({ animationScenes }: { animationScenes: AnimationSceneJson | null }) {
  if (!animationScenes?.scenes.length) {
    return <p className="rounded-md border border-border bg-card p-4 text-sm text-muted-foreground">还没有动画场景结构。</p>;
  }

  return (
    <div className="grid gap-3">
      {animationScenes.scenes.map((scene) => (
        <article key={scene.sceneId} className="rounded-md border border-border bg-card p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold">{scene.sceneTitle}</h3>
            <span className="rounded-sm bg-muted px-2 py-1 text-[11px] text-muted-foreground">{scene.hyperFramesStatus}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {scene.sceneId} · from {scene.sourceSceneId} · {scene.duration}
          </p>
          <div className="mt-3 grid gap-2">
            {scene.timeline.map((step) => (
              <div key={`${scene.sceneId}-${step.target}-${step.start}`} className="grid grid-cols-[1fr_1fr_70px] gap-2 rounded-sm bg-muted p-2 text-xs">
                <span>{step.target}</span>
                <span>{step.effect}</span>
                <span>{step.start}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">{scene.notes}</p>
        </article>
      ))}
    </div>
  );
}
