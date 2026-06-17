export type SceneType =
  | "narration"
  | "dialogue"
  | "choice"
  | "chat"
  | "popup"
  | "ending"
  | "epilogue";

export interface Choice {
  label: string;
  next: string;
}

export interface Lesson {
  title: string;
  content: string;
}

export interface ContentBlock {
  type: "text" | "lesson";
  title?: string;
  value: string;
}

export interface Scene {
  id: string;
  type: SceneType;

  speaker?: string;
  text?: string;

  background?: string;
  character?: string;

  title?: string;

  content?: ContentBlock[];

  choices?: Choice[];

  next?: string;
}

export type Story = Record<string, Scene>;
