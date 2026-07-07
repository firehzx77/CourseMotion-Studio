export type AssetType = "image" | "icon" | "background" | "character" | "chart";

export interface AssetPromptItem {
  assetId: string;
  sceneId: string;
  assetType: AssetType;
  prompt: string;
  usage: string;
}

export interface AssetPromptJson {
  assets: AssetPromptItem[];
}
