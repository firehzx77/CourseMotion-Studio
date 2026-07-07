import { z } from "zod";

export const scriptModuleSchema = z.object({
  moduleTitle: z.string().default(""),
  script: z.string().default(""),
  caseExplanation: z.string().default(""),
  interactionPrompt: z.string().default(""),
  transition: z.string().default("")
});

export const scriptJsonSchema = z.object({
  opening: z.string().default(""),
  modules: z.array(scriptModuleSchema).default([]),
  closing: z.string().default("")
});

export type ScriptJsonInput = z.infer<typeof scriptJsonSchema>;
