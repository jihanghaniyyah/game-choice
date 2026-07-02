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
    <div className="relative h-full w-full overflow-hidden">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: scene.background
            ? `url(${scene.background})`
            : undefined,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20" />

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

      {/* POPUP */}
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
