"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { prettyJson } from "@/lib/utils";

type JsonEditorProps<T> = {
  title: string;
  value: T | null;
  emptyText: string;
  onChange: (value: T) => void;
};

export function JsonEditor<T>({ title, value, emptyText, onChange }: JsonEditorProps<T>) {
  const [draft, setDraft] = useState(value ? prettyJson(value) : "");
  const [message, setMessage] = useState("");

  useMemo(() => {
    setDraft(value ? prettyJson(value) : "");
  }, [value]);

  function applyJson() {
    try {
      onChange(JSON.parse(draft) as T);
      setMessage("JSON 已应用");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "JSON 格式错误");
    }
  }

  return (
    <section className="flex min-h-0 flex-1 flex-col">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold">{title}</h2>
        <Button size="sm" variant="secondary" onClick={applyJson} disabled={!draft.trim()}>
          应用 JSON
        </Button>
      </div>
      <textarea
        className="min-h-[360px] flex-1 rounded-md border border-input bg-card p-3 font-mono text-xs leading-5 outline-none ring-ring focus:ring-2"
        placeholder={emptyText}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
      />
      {message ? <p className="mt-2 text-xs text-muted-foreground">{message}</p> : null}
    </section>
  );
}
