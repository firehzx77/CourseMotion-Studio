import type { AssetPromptJson } from "@/lib/types/asset";

export function AssetList({ assets }: { assets: AssetPromptJson | null }) {
  if (!assets?.assets.length) {
    return <p className="rounded-md border border-border bg-card p-4 text-sm text-muted-foreground">还没有素材 Prompt。</p>;
  }

  return (
    <div className="grid gap-3">
      {assets.assets.map((asset) => (
        <article key={asset.assetId} className="rounded-md border border-border bg-card p-3">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h3 className="font-mono text-xs font-semibold">{asset.assetId}</h3>
            <span className="rounded-sm bg-muted px-2 py-1 text-[11px] text-muted-foreground">{asset.assetType}</span>
          </div>
          <p className="text-xs text-muted-foreground">{asset.sceneId} · {asset.usage}</p>
          <p className="mt-2 text-sm leading-6">{asset.prompt}</p>
        </article>
      ))}
    </div>
  );
}
