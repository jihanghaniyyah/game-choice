export type SceneType =
  | "narration"
  | "dialogue"
  | "choice"
  | "chat"
  | "popup"
  | "ending";

export interface Choice {
  label: string;
  next: string;
}

export interface Scene {
  id: string;
  type: SceneType;

  speaker?: string;
  text?: string;

  background?: string;
  character?: string;
  expression?: string;

  title?: string;

  choices?: Choice[];

  next?: string;
}

export type Story = Record<string, Scene>;
