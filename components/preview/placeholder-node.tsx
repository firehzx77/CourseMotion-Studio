import { Construction } from "lucide-react";

export function PlaceholderNode({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-md border border-border bg-card p-6">
      <Construction className="mb-4 h-6 w-6 text-accent" />
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
      <div className="mt-4 rounded-md bg-muted p-3 text-xs text-muted-foreground">
        第一阶段只保留接口与数据结构占位，不实现完整生产链路。
      </div>
    </div>
  );
}
