import { Scene } from "@/types/story";

import DialogueBox from "./DialogueBox";
import NarrationBox from "./NarrationBox";
import ChoiceList from "./ChoiceList";
import InfoBox from "./InfoBox";

interface SceneRendererProps {
  scene: Scene;
  nextScene: () => void;
  choose: (nextId: string) => void;
}

export default function SceneRenderer({ scene, choose }: SceneRendererProps) {
  return (
    <div className="flex h-full flex-col">
      {/* SCENE AREA */}

      <div
        className="flex-1 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: `url(${scene.background})`,
        }}
      ></div>

      {/* DIALOGUE */}
      {scene.type === "dialogue" && (
        <DialogueBox speaker={scene.speaker ?? ""} text={scene.text ?? ""} />
      )}

      {/* NARRATION */}
      {scene.type === "narration" && <NarrationBox text={scene.text ?? ""} />}

      {/* CHOICE */}
      {scene.type === "choice" && (
        <ChoiceList choices={scene.choices ?? []} onChoose={choose} />
      )}

      {/* POPUP EDUKASI */}
      {scene.type === "popup" && (
        <InfoBox title={scene.title} content={scene.content ?? []} />
      )}

      {/* ENDING */}
      {scene.type === "ending" && (
        <InfoBox title={scene.title} content={scene.content ?? []} />
      )}

      {/* EPILOGUE */}
      {scene.type === "epilogue" && (
        <InfoBox title={scene.title} content={scene.content ?? []} />
      )}
    </div>
  );
}
