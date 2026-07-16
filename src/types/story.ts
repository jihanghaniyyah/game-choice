export type SceneType =
  | "splash"
  | "narration"
  | "dialogue"
  | "choice"
  | "chat"
  | "overlay"
  | "popup"
  | "ending"
  | "epilogue"
  | "video";

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

export interface Camera {
  enabled?: boolean;
  start?: "left" | "center" | "right";
}

export interface CharacterInstance {
  id: string;
  image: string;
  position: 1 | 2 | 3 | 4 | 5;
  scale?: number;
  offsetX?: number;
  offsetY?: number;
}

export interface Overlay {
  icon: string;
  image: string;
}

export interface Scene {
  id: string;
  type: SceneType;

  speaker?: string;
  text?: string;

  background?: string;

  overlay?: Overlay;

  characters?: CharacterInstance[];

  camera?: Camera;
  backgroundSize?: {
    width: number;
    height: number;
  };

  title?: string;

  content?: ContentBlock[];

  choices?: Choice[];

  controls?: "intro" | "default" | "none";

  video?: string;

  next?: string;
}

export type Story = Record<string, Scene>;
