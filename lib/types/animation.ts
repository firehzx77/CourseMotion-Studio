export interface AnimationStep {
  target: string;
  effect: string;
  start: string;
  duration: string;
  easing: string;
}

export interface AnimationScene {
  sceneId: string;
  sceneTitle: string;
  sourceSceneId: string;
  duration: string;
  layout: string;
  elements: string[];
  timeline: AnimationStep[];
  hyperFramesStatus: "local-scene-plan" | "hyperframes-ready";
  notes: string;
}

export interface AnimationSceneJson {
  scenes: AnimationScene[];
}
