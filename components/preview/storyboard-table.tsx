import type { StoryboardJson } from "@/lib/types/storyboard";

export function StoryboardTable({ storyboard }: { storyboard: StoryboardJson | null }) {
  if (!storyboard?.scenes.length) {
    return <p className="rounded-md border border-border bg-card p-4 text-sm text-muted-foreground">还没有 Storyboard 分镜。</p>;
  }

  return (
    <div className="overflow-auto rounded-md border border-border bg-card">
      <table className="min-w-[920px] border-collapse text-left text-xs">
        <thead className="bg-muted text-muted-foreground">
          <tr>
            <th className="border-b border-border p-2">ID</th>
            <th className="border-b border-border p-2">标题</th>
            <th className="border-b border-border p-2">时长</th>
            <th className="border-b border-border p-2">屏幕文字</th>
            <th className="border-b border-border p-2">动画</th>
            <th className="border-b border-border p-2">PPT 建议</th>
          </tr>
        </thead>
        <tbody>
          {storyboard.scenes.map((scene) => (
            <tr key={scene.sceneId} className="align-top">
              <td className="border-b border-border p-2 font-mono">{scene.sceneId}</td>
              <td className="border-b border-border p-2 font-medium">{scene.sceneTitle}</td>
              <td className="border-b border-border p-2">{scene.duration}</td>
              <td className="border-b border-border p-2">{scene.screenText}</td>
              <td className="border-b border-border p-2">{scene.animationType}</td>
              <td className="border-b border-border p-2">{scene.pptSlideSuggestion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
