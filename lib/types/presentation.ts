export interface PresentationSlide {
  slideId: string;
  title: string;
  subtitle?: string;
  bullets: string[];
  speakerNotes: string;
  visualPrompt: string;
  layout: "cover" | "section" | "content" | "summary";
}

export interface PresentationJson {
  deckTitle: string;
  themeName: string;
  slides: PresentationSlide[];
}
