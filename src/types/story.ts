import { CHARACTER_ASSETS } from "@/data/characters";

export type SceneType =
  | "splash"
  | "narration"
  | "dialogue"
  | "choice"
  | "chat"
  | "overlay"
  | "popup"
  | "ending"
  | "chat"
  | "epilogue"
  | "video"
  | "audio"
  | "image-choice";

export interface ChatMessage {
  from: "me" | "other";
  text: string;
}

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
  asset?: keyof typeof CHARACTER_ASSETS;
  walkFrames?: string[];
  position: 1 | 2 | 3 | 4 | 5;
  moveTo?: 1 | 2 | 3 | 4 | 5;
  scale?: number;
  offsetX?: number;
  offsetY?: number;
}

export interface Overlay {
  icon: string;
  image: string;
}

export interface Hotspot {
  left: string;
  top: string;
  width: string;
  height: string;
  next: string;
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
  hotspots?: Hotspot[];
  choiceLayout?: "vertical" | "horizontal";
  controls?: "intro" | "default" | "none";
  messages?: ChatMessage[];
  showNotebook?: boolean;
  video?: string;
  audio?: string;
  next?: string;
  flash?: boolean;
  transition?: "fade";
}

export type Story = Record<string, Scene>;
