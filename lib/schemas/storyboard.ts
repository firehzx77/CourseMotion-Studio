import { z } from "zod";

export const storyboardSceneSchema = z.object({
  sceneId: z.string().default("scene_001"),
  sceneTitle: z.string().default(""),
  duration: z.string().default("10s"),
  voiceover: z.string().default(""),
  screenText: z.string().default(""),
  visualDescription: z.string().default(""),
  animationType: z.string().default(""),
  assetPrompt: z.string().default(""),
  transition: z.string().default(""),
  pptSlideSuggestion: z.string().default("")
});

export const storyboardJsonSchema = z.object({
  scenes: z.array(storyboardSceneSchema).default([])
});

export type StoryboardJsonInput = z.infer<typeof storyboardJsonSchema>;
