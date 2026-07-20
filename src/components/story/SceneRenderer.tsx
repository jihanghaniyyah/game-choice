import { useState } from "react";
import { useEffect } from "react";

import { Scene } from "@/types/story";

import BackgroundLayer from "./BackgroundLayer";
import CharacterLayer from "./CharacterLayer";
import OverlayLayer from "./OverlayLayer";
import SplashBox from "./SplashBox";
import DialogueBox from "./DialogueBox";
import ChatBox from "./ChatBox";
import NarrationBox from "./NarrationBox";
import ChoiceList from "./ChoiceList";
import InfoBox from "./InfoBox";
import HotspotLayer from "./HotspotLayer";
import VideoPlayer from "./VideoPlayer";
import AudioPlayer from "./AudioPlayer";
import FlashEffect from "./FlashEffect";
import FadeTransition from "./FadeTransition";
import ImageChoice from "./ImageChoice";
import NotebookButton from "./NotebookButton";
import OverlayUI from "./OverlayUI";

interface SceneRendererProps {
  scene: Scene;
  nextScene: () => void;
  choose: (nextId: string) => void;
  visitedFriends: string[];
  flash: boolean;
  transition: boolean;
  readNotebooks: string[];
  markNotebookAsRead: () => void;
  cameraX: number;
  roomState: {
    desk: boolean;
    bed: boolean;
    painting: boolean;
    wardrobe: boolean;
  };
  gameSession: number;
  visibleMessages: number;
  showWardrobeOverlay: boolean;
  onWardrobeComplete: () => void;
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
  cameraX,
  roomState,
  gameSession,
  visibleMessages,
  showWardrobeOverlay,
  onWardrobeComplete,
}: SceneRendererProps) {
  const [showOverlay, setShowOverlay] = useState(false);
  useEffect(() => {
    setShowOverlay(false);
  }, [scene.id]);

  const allTasksCompleted =
    roomState.desk && roomState.bed && roomState.painting && roomState.wardrobe;

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Background */}
      <BackgroundLayer
        scene={scene}
        cameraX={cameraX}
        roomState={roomState}
        onHotspotClick={choose}
      />

      {scene.audio && <AudioPlayer src={scene.audio} />}

      {/* Character */}
      <CharacterLayer scene={scene} gameSession={gameSession} />

      {scene.hotspots && scene.id === "day2_029" && (
        <HotspotLayer
          hotspots={scene.hotspots}
          onClick={choose}
          roomState={roomState}
          cameraX={cameraX}
          showWardrobeOverlay={showWardrobeOverlay}
          onWardrobeComplete={onWardrobeComplete}
        />
      )}

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

      {scene.id === "day2_029" && allTasksCompleted && (
        <button
          onClick={nextScene}
          className="
      absolute
      bottom-6
      right-8
      z-50
      cursor-pointer
      rounded-xl
      bg-green-600
      px-6
      py-3
      font-semibold
      text-white
      transition
      hover:bg-green-500
    "
        >
          Lanjut →
        </button>
      )}

      {/* UI Layer */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        {scene.type === "splash" && <SplashBox onStart={nextScene} />}

        {scene.type === "dialogue" && (
          <DialogueBox speaker={scene.speaker ?? ""} text={scene.text ?? ""} />
        )}

        {scene.type === "narration" && <NarrationBox text={scene.text ?? ""} />}

        {scene.type === "chat" && (
          <ChatBox
            messages={scene.messages ?? []}
            visibleCount={visibleMessages}
            chatMode={scene.chatMode}
          />
        )}

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

        {scene.overlayUI?.type === "narration" && (
          <NarrationBox text={scene.overlayUI.text} />
        )}

        {(scene.type === "popup" ||
          scene.type === "ending" ||
          scene.type === "epilogue") && (
          <InfoBox title={scene.title} content={scene.content ?? []} />
        )}

        {scene.type === "video" && scene.video && (
          <VideoPlayer src={scene.video} onEnded={nextScene} />
        )}

        {scene.overlayUI && (
          <OverlayUI>
            {scene.overlayUI.type === "dialogue" ? (
              <DialogueBox
                speaker={scene.overlayUI.speaker ?? ""}
                text={scene.overlayUI.text}
              />
            ) : (
              <NarrationBox text={scene.overlayUI.text} />
            )}
          </OverlayUI>
        )}

        {scene.overlayChoice && (
          <ChoiceList
            choices={scene.overlayChoice.choices}
            onChoose={choose}
            visitedFriends={visitedFriends}
          />
        )}
      </div>

      <FlashEffect visible={flash} />
      <FadeTransition visible={transition} />
    </div>
  );
}
