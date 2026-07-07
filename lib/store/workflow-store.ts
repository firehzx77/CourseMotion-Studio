"use client";

import { create } from "zustand";
import type { AssetPromptJson } from "@/lib/types/asset";
import type { AnimationSceneJson } from "@/lib/types/animation";
import type { CourseJson } from "@/lib/types/course";
import type { PresentationJson } from "@/lib/types/presentation";
import type { ScriptJson } from "@/lib/types/script";
import type { StoryboardJson } from "@/lib/types/storyboard";
import type { VisualSystemJson } from "@/lib/types/visual";

export type WorkflowStepId =
  | "outline-input"
  | "outline-parser"
  | "script"
  | "storyboard"
  | "visual"
  | "assets"
  | "ppt"
  | "animation"
  | "video"
  | "audio"
  | "export";

type WorkflowState = {
  activeStep: WorkflowStepId;
  outlineText: string;
  course: CourseJson | null;
  script: ScriptJson | null;
  storyboard: StoryboardJson | null;
  visualSystem: VisualSystemJson | null;
  assets: AssetPromptJson | null;
  presentation: PresentationJson | null;
  animationScenes: AnimationSceneJson | null;
  status: string;
  versions: string[];
  setActiveStep: (step: WorkflowStepId) => void;
  setOutlineText: (text: string) => void;
  setCourse: (course: CourseJson | null) => void;
  setScript: (script: ScriptJson | null) => void;
  setStoryboard: (storyboard: StoryboardJson | null) => void;
  setVisualSystem: (visualSystem: VisualSystemJson | null) => void;
  setAssets: (assets: AssetPromptJson | null) => void;
  setPresentation: (presentation: PresentationJson | null) => void;
  setAnimationScenes: (animationScenes: AnimationSceneJson | null) => void;
  setStatus: (status: string) => void;
  addVersion: (label: string) => void;
};

export const useWorkflowStore = create<WorkflowState>((set) => ({
  activeStep: "outline-input",
  outlineText: "",
  course: null,
  script: null,
  storyboard: null,
  visualSystem: null,
  assets: null,
  presentation: null,
  animationScenes: null,
  status: "等待输入课程大纲",
  versions: [],
  setActiveStep: (activeStep) => set({ activeStep }),
  setOutlineText: (outlineText) => set({ outlineText }),
  setCourse: (course) => set({ course }),
  setScript: (script) => set({ script }),
  setStoryboard: (storyboard) => set({ storyboard }),
  setVisualSystem: (visualSystem) => set({ visualSystem }),
  setAssets: (assets) => set({ assets }),
  setPresentation: (presentation) => set({ presentation }),
  setAnimationScenes: (animationScenes) => set({ animationScenes }),
  setStatus: (status) => set({ status }),
  addVersion: (label) => set((state) => ({ versions: [`${new Date().toLocaleTimeString()} ${label}`, ...state.versions].slice(0, 8) }))
}));
