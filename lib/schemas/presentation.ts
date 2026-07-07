import { z } from "zod";

export const presentationSlideSchema = z.object({
  slideId: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  bullets: z.array(z.string()).default([]),
  speakerNotes: z.string().default(""),
  visualPrompt: z.string().default(""),
  layout: z.enum(["cover", "section", "content", "summary"]).default("content")
});

export const presentationJsonSchema = z.object({
  deckTitle: z.string(),
  themeName: z.string().default("CourseMotion 默认商务风"),
  slides: z.array(presentationSlideSchema).default([])
});

export type PresentationInput = z.infer<typeof presentationJsonSchema>;
