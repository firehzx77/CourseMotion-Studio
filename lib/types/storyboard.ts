export interface StoryboardScene {
  sceneId: string;
  sceneTitle: string;
  duration: string;
  voiceover: string;
  screenText: string;
  visualDescription: string;
  animationType: string;
  assetPrompt: string;
  transition: string;
  pptSlideSuggestion: string;
}

export interface StoryboardJson {
  scenes: StoryboardScene[];
}
