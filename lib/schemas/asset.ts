import { z } from "zod";

export const assetTypeSchema = z.enum(["image", "icon", "background", "character", "chart"]);

export const assetPromptItemSchema = z.object({
  assetId: z.string().default("asset_001"),
  sceneId: z.string().default("scene_001"),
  assetType: assetTypeSchema.default("image"),
  prompt: z.string().default(""),
  usage: z.string().default("")
});

export const assetPromptJsonSchema = z.object({
  assets: z.array(assetPromptItemSchema).default([])
});

export type AssetPromptInput = z.infer<typeof assetPromptJsonSchema>;
