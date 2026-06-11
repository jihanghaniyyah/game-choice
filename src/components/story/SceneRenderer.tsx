import { Scene } from "@/types/story";

import DialogueBox from "./DialogueBox";
import NarrationBox from "./NarrationBox";
import ChoiceList from "./ChoiceList";

interface SceneRendererProps {
  scene: Scene;
  nextScene: () => void;
  choose: (nextId: string) => void;
}

export default function SceneRenderer({
  scene,
  nextScene,
  choose,
}: SceneRendererProps) {
  switch (scene.type) {
    case "narration":
      return (
        <>
          <NarrationBox text={scene.text ?? ""} />

          {scene.next && (
            <button
              onClick={nextScene}
              className="mt-4 rounded bg-green-600 px-4 py-2"
            >
              Lanjut
            </button>
          )}
        </>
      );

    case "dialogue":
      return (
        <>
          <DialogueBox speaker={scene.speaker ?? ""} text={scene.text ?? ""} />

          {scene.next && (
            <button
              onClick={nextScene}
              className="mt-4 rounded bg-green-600 px-4 py-2"
            >
              Lanjut
            </button>
          )}
        </>
      );

    case "choice":
      return <ChoiceList choices={scene.choices ?? []} onChoose={choose} />;

    case "ending":
      return (
        <div className="rounded-xl bg-green-700 p-6">
          <h2 className="mb-2 text-2xl font-bold">{scene.title}</h2>

          <p>{scene.text}</p>
        </div>
      );

    default:
      return null;
  }
}
