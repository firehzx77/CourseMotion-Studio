import { z } from "zod";

export const courseModuleSchema = z.object({
  moduleTitle: z.string().default(""),
  duration: z.string().default(""),
  learningObjectives: z.array(z.string()).default([]),
  keyPoints: z.array(z.string()).default([]),
  cases: z.array(z.string()).default([]),
  activities: z.array(z.string()).default([]),
  instructorNotes: z.array(z.string()).default([])
});

export const courseJsonSchema = z.object({
  courseTitle: z.string().default(""),
  targetAudience: z.string().default(""),
  courseDuration: z.string().default(""),
  courseGoal: z.string().default(""),
  courseStyle: z.string().default(""),
  modules: z.array(courseModuleSchema).default([])
});

export type CourseJsonInput = z.infer<typeof courseJsonSchema>;
