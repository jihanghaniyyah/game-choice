import { useState } from "react";
import { useEffect } from "react";

import { Scene } from "@/types/story";

import BackgroundLayer from "./BackgroundLayer";
import CharacterLayer from "./CharacterLayer";
import OverlayLayer from "./OverlayLayer";
import SplashBox from "./SplashBox";
import DialogueBox from "./DialogueBox";
import NarrationBox from "./NarrationBox";
import ChoiceList from "./ChoiceList";
import InfoBox from "./InfoBox";
import VideoPlayer from "./VideoPlayer";
import AudioPlayer from "./AudioPlayer";
import FlashEffect from "./FlashEffect";
import FadeTransition from "./FadeTransition";
import ImageChoice from "./ImageChoice";
import NotebookButton from "./NotebookButton";

interface SceneRendererProps {
  scene: Scene;
  nextScene: () => void;
  choose: (nextId: string) => void;
  visitedFriends: string[];
  flash: boolean;
  transition: boolean;
  readNotebooks: string[];
  markNotebookAsRead: () => void;
}

export default function SceneRenderer({
  scene,
  nextScene,
  choose,
  visitedFriends,
  flash,
  transition,
  readNotebooks,
  markNotebookAsRead,
}: SceneRendererProps) {
  const [showOverlay, setShowOverlay] = useState(false);
  useEffect(() => {
    setShowOverlay(false);
  }, [scene.id]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Background */}
      <BackgroundLayer scene={scene} />

      {scene.audio && <AudioPlayer src={scene.audio} />}

      {/* Character */}
      <CharacterLayer scene={scene} />

      {/* Overlay Gelap */}
      <div className="absolute inset-0 z-30" />

      {/* Notebook Icon */}
      {scene.showNotebook !== false && (
        <NotebookButton
          onOpen={() => {
            setShowOverlay(true);
            markNotebookAsRead();
          }}
          hasNotification={!!scene.overlay && !readNotebooks.includes(scene.id)}
        />
      )}

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
            layout={scene.choiceLayout}
          />
        )}

        {scene.type === "image-choice" && (
          <ImageChoice hotspots={scene.hotspots ?? []} onChoose={choose} />
        )}

        {(scene.type === "popup" ||
          scene.type === "ending" ||
          scene.type === "epilogue") && (
          <InfoBox title={scene.title} content={scene.content ?? []} />
        )}

        {scene.type === "video" && scene.video && (
          <VideoPlayer src={scene.video} onEnded={nextScene} />
        )}
      </div>

      <FlashEffect visible={flash} />
      <FadeTransition visible={transition} />
    </div>
  );
}
