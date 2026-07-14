import { useState } from "react";
import { useEffect } from "react";

import { Scene } from "@/types/story";

import BackgroundLayer from "./BackgroundLayer";
import CharacterLayer from "./CharacterLayer";
import OverlayLayer from "./OverlayLayer";
import OverlayTrigger from "./OverlayTrigger";
import SplashBox from "./SplashBox";
import DialogueBox from "./DialogueBox";
import NarrationBox from "./NarrationBox";
import ChoiceList from "./ChoiceList";
import InfoBox from "./InfoBox";

interface SceneRendererProps {
  scene: Scene;
  nextScene: () => void;
  choose: (nextId: string) => void;
  visitedFriends: string[];
}

export default function SceneRenderer({
  scene,
  nextScene,
  choose,
  visitedFriends,
}: SceneRendererProps) {
  const [showOverlay, setShowOverlay] = useState(false);
  useEffect(() => {
    setShowOverlay(false);
  }, [scene.id]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Background */}
      <BackgroundLayer scene={scene} />

      {/* Character */}
      <CharacterLayer scene={scene} />

      {/* Overlay Gelap */}
      <div className="absolute inset-0 z-30" />

      {/* Notebook Icon */}
      <OverlayTrigger scene={scene} onOpen={() => setShowOverlay(true)} />

      {/* Notebook Overlay */}
      <OverlayLayer
        scene={scene}
        visible={showOverlay}
        onClose={() => setShowOverlay(false)}
      />

      {/* UI Layer */}
      <div className="absolute inset-0 z-40">
        {scene.type === "splash" && <SplashBox onStart={nextScene} />}

        {scene.type === "dialogue" && (
          <DialogueBox speaker={scene.speaker ?? ""} text={scene.text ?? ""} />
        )}

        {scene.type === "narration" && <NarrationBox text={scene.text ?? ""} />}

        {scene.type === "choice" && (
          <ChoiceList
            choices={scene.choices ?? []}
            onChoose={choose}
            visitedFriends={visitedFriends}
          />
        )}

        {(scene.type === "popup" ||
          scene.type === "ending" ||
          scene.type === "epilogue") && (
          <InfoBox title={scene.title} content={scene.content ?? []} />
        )}
      </div>
    </div>
  );
}
