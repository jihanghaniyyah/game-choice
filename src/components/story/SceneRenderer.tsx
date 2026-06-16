import { Scene } from "@/types/story";

import DialogueBox from "./DialogueBox";
import NarrationBox from "./NarrationBox";
import ChoiceList from "./ChoiceList";

interface SceneRendererProps {
  scene: Scene;
  nextScene: () => void;
  choose: (nextId: string) => void;
}

export default function SceneRenderer({ scene, choose }: SceneRendererProps) {
  return (
    <div className="flex h-full flex-col">
      {/* SCENE AREA */}
      <div className="flex-1 bg-slate-950">
        {/* nanti background masuk sini */}
      </div>

      {/* CONTENT AREA */}
      {scene.type === "dialogue" && (
        <DialogueBox speaker={scene.speaker ?? ""} text={scene.text ?? ""} />
      )}

      {scene.type === "narration" && <NarrationBox text={scene.text ?? ""} />}

      {scene.type === "choice" && (
        <ChoiceList choices={scene.choices ?? []} onChoose={choose} />
      )}
    </div>
  );
}
