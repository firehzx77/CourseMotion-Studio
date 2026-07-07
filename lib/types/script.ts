export interface ScriptModule {
  moduleTitle: string;
  script: string;
  caseExplanation: string;
  interactionPrompt: string;
  transition: string;
}

export interface ScriptJson {
  opening: string;
  modules: ScriptModule[];
  closing: string;
}
