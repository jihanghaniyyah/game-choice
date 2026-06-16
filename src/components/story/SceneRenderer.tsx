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
        <NarrationBox
          text={scene.text ?? ""}
          onNext={scene.next ? nextScene : undefined}
        />
      );

    case "dialogue":
      return (
        <DialogueBox
          speaker={scene.speaker ?? ""}
          text={scene.text ?? ""}
          onNext={scene.next ? nextScene : undefined}
        />
      );

    case "choice":
      return <ChoiceList choices={scene.choices ?? []} onChoose={choose} />;

    default:
      return null;
  }
}
