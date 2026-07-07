import { z } from "zod";

export const animationStepSchema = z.object({
  target: z.string(),
  effect: z.string(),
  start: z.string(),
  duration: z.string(),
  easing: z.string()
});

export const animationSceneSchema = z.object({
  sceneId: z.string(),
  sceneTitle: z.string(),
  sourceSceneId: z.string(),
  duration: z.string(),
  layout: z.string(),
  elements: z.array(z.string()).default([]),
  timeline: z.array(animationStepSchema).default([]),
  hyperFramesStatus: z.enum(["local-scene-plan", "hyperframes-ready"]).default("local-scene-plan"),
  notes: z.string().default("")
});

export const animationSceneJsonSchema = z.object({
  scenes: z.array(animationSceneSchema).default([])
});

export type AnimationSceneInput = z.infer<typeof animationSceneJsonSchema>;
